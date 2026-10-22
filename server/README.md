# 《代汉涂高》正式版服务端

预览版（[GitHub Pages](https://liveldy.github.io/daihan-tugao/)）是纯静态之站，随仓库而更新，人人可开，
惟无账号、无云存档、无在线更新。正式版由本服务端提供：同一份静态之站，另加三类服务——

| 功能 | 接口 | 说明 |
|---|---|---|
| 账号 | `POST /api/register`、`POST /api/login`、`POST /api/logout`、`GET /api/session` | 口令以 scrypt 加盐存散列，不留明文；令牌为 32 字节随机之串 |
| 云存档 | `GET /api/save`、`POST /api/save` | 内容即浏览器本地之「疆场之记」（已克之关、逐关解锁、续战之记），跨机可取 |
| 版本与更新 | `GET /api/version`、`GET /api/health`、`GET /api/events`（SSE）、`/api/admin/*` | 版本检查、维护公告、管理员手动施行更新与回滚 |

只依赖 Node 内建模块（Node 18 以上；自 Git 仓库取新版时另需 `git`）。

## 一、起服务

```sh
node server/server.js --port 8080 --web . --data ./server/data
```

- `--port`：监听之口，默认 8080（亦可用环境变量 `PORT`）。
- `--host`：监听之址，默认 `127.0.0.1`；欲对公网开放，可设 `--host 0.0.0.0`，并宜置于
  Nginx / Caddy 之类之后以理 TLS。
- `--web`：站目录，默认为本仓库根（即 `index.html` 所在之处）。更新之时所替换者即此目录。
- `--data`：数据目录，默认 `server/data`，存用户库、令牌、云存档、更新之录。
- `--admin-token`：管理员令牌；未给则取环境变量 `DAIHAN_ADMIN_TOKEN`，再无则首次启动
  自动生成于 `<data>/admin.token`（**此文件即管理员之钥，切勿外泄，亦勿入版本库**）。
- `--drain-idle`（默认 20000 毫秒）：逾此时间无动作之会话，视为已下场。
- `--drain-timeout`（默认 180000 毫秒）：待客之上限，逾则强制替换。

首次启动后，于游戏主页面点「账号」注册；**首位注册者掌管理之权**，其界面即现「管理 · 在线更新」一栏。
（亦可以 `x-admin-token` 头直接调用管理接口，供脚本之用。）

## 二、更新之序（管理员手动触发）

更新之事，务求在局者不半途而废，故分五步：

1. **检查**（`POST /api/admin/check`）：比对新版之 `VERSION`、必需文件与逐文件散列，
   报其新增、改动、删除之数；**不动线上**。
2. **暂存**（`POST /api/admin/update`，内部）：新版先入 `<data>/stage-web`，校验版本与必需文件
   （`index.html`、`VERSION`、`src/main.js`、`src/data/version.js`）而后可用。
3. **冻结**：广播维护公告（SSE 与 `GET /api/health` 皆报），**拒新登录**与其他写操作；
   静态之站仍照旧供应，故在局者不致断局。
4. **待客**：待在线诸客自然下场——以会话最近之动作为准，逾 `drain-idle` 视为已下场；
   逾 `drain-timeout` 则强制。
5. **替换**：旧站目录更名为 `<web>.prev` 留档，暂存目录就其位（各为一次改名，故无半新半旧之态）；
   撤维护公告，广播「update 已毕」。若有不虞，可 `POST /api/admin/rollback` 以留档复原。

新版之源二式：`{"source":{"git":"https://github.com/liveldy/daihan-tugao","ref":"main"}}`
（自远端取，`git clone --depth 1`）；或 `{"source":{"dir":"/path/to/prepared/site"}}`（直取本机之目录）。

一面更新，一面可以 `GET /api/admin/status` 观其进度（`phase`：check / stage / freeze / drain / swap）。

## 三、自检

```sh
node server/test.js
```

起一临时服务（临时端口、临时站目录、临时数据目录），逐一验：健康与静态、越界之径、账号与会话、
云存档、管理权限、检查更新、施行更新（含待客下线、原子替换、旧令牌与存档不失效）、回滚、
维护公告（拒新登录而不断在局者）、事件流、自 Git 拉取新版。毕则删其临时之所。

## 四、安放之宜

- `server/data/` 已在 `.gitignore` 之中（用户库、令牌、云存档、维护与更新之录皆在其中）。
- 管理员令牌、用户口令之散列俱在数据目录；备份之、限其权限。
- 反代之后宜设 TLS，并将 `/api/` 与静态之分流一致（`/api/events` 为 Server-Sent Events，
  须禁缓冲，如 Nginx 之 `proxy_buffering off;`）。
- 本站不以「管理员」身份转发任何人之请求；管理员之权仅系于令牌。
