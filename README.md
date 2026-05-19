# Netlify CLI Template 🚀

A **robust** and **adaptable** template for building serverless applications and static sites with Netlify CLI. Modern setup with **TypeScript**, **Netlify Functions v2** (Web API format), Neon Postgres, Netlify Blobs, scheduled jobs, and a customizable static frontend.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Netlify Status](https://api.netlify.com/api/v1/badges/775d29f8-97b2-4f54-a2e5-85538a6d56b0/deploy-status)](https://app.netlify.com/projects/netlify-cli-template/deploys)

## ✨ Features

- **Functions v2** — Native `Request`/`Response` Web API format; no AWS Lambda types. Path routing via `Config` export. 🛠️
- **TypeScript** — Strict, ES2022 target, `moduleResolution: "bundler"` for modern packages. 📝
- **Neon Postgres** — `@neondatabase/serverless` HTTP driver; no TCP overhead in cold starts. 🗄️
- **Netlify Blobs** — Built-in KV/object store with `@netlify/blobs`. No external Redis needed. 💾
- **Scheduled Functions** — Cron jobs via `Config.schedule`. Zero extra infra. ⏰
- **Background Functions** — Fire-and-forget tasks up to 15 minutes via `-background` suffix. 🔄
- **esbuild Bundler** — Faster builds, smaller function artifacts. ⚡
- **Node.js 22** — Netlify's default runtime since February 2025. 🟢
- **Static Site** — Customizable HTML frontend in `public/`, ready for React, Vue, or Astro. 🌐

## 📂 Project Structure

```
netlify-cli-template/
├── netlify/
│   └── functions/
│       ├── hello.mts                    # GET /api/hello — greets by name
│       ├── time.mts                     # GET /api/time — current UTC time
│       ├── echo.mts                     # POST /api/echo — echoes JSON body
│       ├── neon.mts                     # GET /api/neon — Neon Postgres query
│       ├── blobs.mts                    # GET|PUT /api/blobs — Netlify Blobs KV
│       ├── daily-cleanup.mts            # Scheduled: runs at midnight UTC daily
│       └── process-export-background.mts # Background: fire-and-forget export
├── public/
│   └── index.html                       # Static site entry point
├── .env.example                         # Environment variable reference
├── netlify.toml                         # Netlify configuration
├── package.json                         # Dependencies and scripts
├── tsconfig.json                        # TypeScript configuration
└── README.md
```

## 🛠️ Prerequisites

- **Node.js**: v20.12.2 or higher (v22 recommended — matches Netlify runtime). 🟢
- **Yarn**: `npm install -g yarn` 📦
- **Netlify CLI**: installed locally via `yarn install` (included as devDependency). 🌍

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/lizzyman04/netlify-cli-template.git
   cd netlify-cli-template
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your actual values (DATABASE_URL, etc.)
   ```

4. **Link to Netlify** (optional, for deploy):
   ```bash
   yarn netlify init
   ```

## 🎮 Usage

**Local development**:
```bash
yarn start
# → http://localhost:8888
```

**Type check**:
```bash
yarn check-types
```

**Deploy**:
```bash
yarn deploy
```

## 🔧 Functions Reference

All functions use the **v2 Web API format**: `(req: Request, context: Context) => Response`. Paths are declared via `Config.path` in each file — no redirect rules needed.

| Function | Method | Path | Description |
|----------|--------|------|-------------|
| `hello` | GET | `/api/hello?name=X` | Greet by name |
| `time` | GET | `/api/time` | Current UTC time |
| `echo` | POST | `/api/echo` | Echo JSON body |
| `neon` | GET | `/api/neon` | Query Neon Postgres |
| `blobs` | GET/PUT | `/api/blobs?key=X` | Netlify Blobs KV store |
| `daily-cleanup` | — | scheduled | Cron: `0 0 * * *` (midnight UTC) |
| `process-export-background` | GET | `/api/process-export` | Fire-and-forget background job |

### Example curl commands

```bash
# Hello
curl "http://localhost:8888/api/hello?name=Arlindo"

# Current time
curl http://localhost:8888/api/time

# Echo
curl -X POST http://localhost:8888/api/echo \
  -H "Content-Type: application/json" \
  -d '{"test": "hello"}'

# Neon (requires DATABASE_URL in .env)
curl http://localhost:8888/api/neon

# Blobs — store a value
curl -X PUT "http://localhost:8888/api/blobs?key=mykey" \
  -H "Content-Type: application/json" \
  -d '{"hello": "world"}'

# Blobs — read it back
curl "http://localhost:8888/api/blobs?key=mykey"
```

## 🗄️ Neon Integration

`neon.mts` uses `@neondatabase/serverless` — an HTTP-based Postgres driver optimised for serverless cold starts (no TCP connection overhead).

**Setup**:
1. Create a database at [neon.tech](https://neon.tech).
2. Copy the connection string into `.env` as `DATABASE_URL`.
3. Run locally: `yarn start` → `curl http://localhost:8888/api/neon`.

## 💾 Netlify Blobs

`blobs.mts` demonstrates Netlify's built-in object/KV store. No external Redis or S3 needed — provisioned automatically.

- `GET /api/blobs?key=X` — read a value
- `PUT /api/blobs?key=X` + JSON body — write a value

Data persists across deploys and is globally available within ~60 seconds.

## ⏰ Scheduled Functions

`daily-cleanup.mts` runs on a cron schedule defined by `Config.schedule`:

```typescript
export const config: Config = {
  schedule: "0 0 * * *",  // midnight UTC daily
};
```

No webhooks, no cron providers — Netlify triggers it automatically.

## 🔄 Background Functions

`process-export-background.mts` is a **background function** (named with `-background` suffix). It:
- Returns a `202 Accepted` immediately
- Continues running for up to **15 minutes**
- Ideal for: data exports, batch processing, slow third-party APIs

## ⚙️ Configuration Notes

**Node.js runtime**: Netlify defaults to **Node.js 22** since February 2025. To pin a specific version, set `AWS_LAMBDA_JS_RUNTIME=nodejs22.x` in the Netlify UI or via CLI env vars.

**Bundler**: `netlify.toml` sets `node_bundler = "esbuild"` for fast, tree-shaken function artifacts.

**TypeScript**: `moduleResolution: "bundler"` enables full support for modern packages that use `package.json#exports`. Target is `ES2022` — aligned with Node.js 22 capabilities.

## 🎨 Customization

- **Add functions**: Create `.mts` files in `netlify/functions/`. Set `Config.path` to route them.
- **Frontend**: Swap `public/` with React, Vue, or Astro — update `build.command` in `netlify.toml`.
- **Environment variables**: Add to `.env` locally; set in Netlify UI or `netlify env:set` for production.
- **Extend Neon**: Add tables, migrations, and an ORM (e.g., Drizzle) on top of the existing `neon.mts` pattern.

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'feat: add your feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request.

## 📜 License

**MIT**. See [LICENSE](LICENSE) for details.

## 👤 Author

**Arlindo Abdul** — [GitHub @lizzyman04](https://github.com/lizzyman04)

## 📚 Resources

- [Netlify Functions v2 Docs](https://docs.netlify.com/build/functions/get-started/)
- [Netlify Blobs Docs](https://docs.netlify.com/build/data-and-storage/netlify-blobs/)
- [Netlify Scheduled Functions](https://docs.netlify.com/build/functions/scheduled-functions/)
- [Netlify Background Functions](https://docs.netlify.com/build/functions/background-functions/)
- [Neon Serverless Driver](https://neon.tech/docs/serverless/serverless-driver)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

---

Built with ❤️ using **Netlify CLI** and **Yarn**.
