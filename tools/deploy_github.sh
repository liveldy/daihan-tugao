#!/usr/bin/env sh
# 把《代汉涂高》推到 GitHub 并开启 Pages（纯静态站，无须构建）。
#
# 用法：sh tools/deploy_github.sh [仓库名] [--private]
#   token 取自环境变量 GITHUB_TOKEN（或 GitHub_token）——由 agent 的 vault 注入，
#   形如 penguin config vault set --key GITHUB_TOKEN --value <token>
#   token 须有 repo 权限（classic）；建库与开 Pages 皆需之。
#
# 本脚本不改动本地文件，也不把 token 写进 .git/config：推送时以临时凭据助手供之。
# 只作 POSIX 之用（bash 与 dash 皆可跑）。
set -eu

REPO_NAME="daihan-tugao"
PRIVATE="false"
for arg in "$@"; do
  case "$arg" in
    --private) PRIVATE="true" ;;
    *) REPO_NAME="$arg" ;;
  esac
done

TOKEN="${GITHUB_TOKEN:-${GitHub_token:-}}"
if [ -z "$TOKEN" ]; then
  echo "未找到 GITHUB_TOKEN（或 GitHub_token）。" >&2
  echo "请先执行：penguin config vault set --key GITHUB_TOKEN --value <token>" >&2
  exit 1
fi

API="https://api.github.com"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

json_field() { node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{try{const o=JSON.parse(s);const v=$1;console.log(v==null?'':v)}catch(e){console.log('')}})"; }
api() { curl -sS -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" \
        -H "X-GitHub-Api-Version: 2022-11-28" "$@"; }

# 一、登录名
LOGIN="$(api "$API/user" | json_field "o.login")"
if [ -z "$LOGIN" ]; then
  echo "token 无效或无权读取 /user —— 请检查 token 与权限。" >&2
  exit 1
fi
echo "账号：$LOGIN"

# 二、建库（已存在则略过）
CODE="$(curl -sS -o /tmp/dht-repo.json -w '%{http_code}' \
  -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -X POST "$API/user/repos" \
  -d "{\"name\":\"$REPO_NAME\",\"private\":$PRIVATE,\"description\":\"代汉涂高 —— 广义三国（184–265）回合制战棋，依正史。纯静态，无依赖。\",\"has_issues\":true,\"has_wiki\":false}")"
case "$CODE" in
  201) echo "已建新库：$LOGIN/$REPO_NAME" ;;
  422) echo "库已存在，沿用：$LOGIN/$REPO_NAME" ;;
  401|403) echo "token 无权建库（HTTP $CODE）—— 需 classic token 的 repo 权限。" >&2; exit 1 ;;
  *) echo "建库返回 HTTP $CODE：" >&2; cat /tmp/dht-repo.json >&2; echo >&2; exit 1 ;;
esac

# 三、推送 main
URL_HTTPS="https://github.com/$LOGIN/$REPO_NAME.git"
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$URL_HTTPS"
else
  git remote add origin "$URL_HTTPS"
fi
git branch -M main

# 临时凭据助手：token 只从环境读，不落盘、不出现在命令行
export GIT_ASKPASS=/bin/echo
git -c credential.helper='' \
    -c 'credential.helper=!f() { echo username=x-access-token; echo password=$TOKEN; }; f' \
    push -u origin main
echo "已推送 main"

# 四、开 Pages（分支 main、根目录）
CODE="$(curl -sS -o /tmp/dht-pages.json -w '%{http_code}' \
  -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -X POST "$API/repos/$LOGIN/$REPO_NAME/pages" \
  -d '{"source":{"branch":"main","path":"/"}}')"
if [ "$CODE" = "409" ]; then
  CODE="$(curl -sS -o /tmp/dht-pages.json -w '%{http_code}' \
    -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    -X PUT "$API/repos/$LOGIN/$REPO_NAME/pages" \
    -d '{"source":{"branch":"main","path":"/"}}')"
fi
case "$CODE" in
  201|204) echo "Pages 已开启" ;;
  *) echo "Pages 返回 HTTP $CODE（站点地址仍可直接试）；详情：" >&2; head -c 400 /tmp/dht-pages.json >&2; echo >&2 ;;
esac

echo
echo "仓库：https://github.com/$LOGIN/$REPO_NAME"
echo "站点：https://$LOGIN.github.io/$REPO_NAME/"
echo "（首次构建约需一分钟；之后每次 git push 自动重发）"
