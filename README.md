# Netlify CLI Template 🚀

A **robust** and **adaptable** template for building serverless applications and static sites with Netlify CLI. This project offers a modern setup with **TypeScript**, multiple serverless functions, and a customizable static frontend—perfect for blogs, APIs, or dynamic web apps! ✨

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Netlify Status](https://api.netlify.com/api/v1/badges/775d29f8-97b2-4f54-a2e5-85538a6d56b0/deploy-status)](https://app.netlify.com/projects/netlify-cli-template/deploys)

## ✨ Features
- **Serverless Functions**: Four TypeScript-based functions (`hello`, `time`, `echo`, `neon`) with robust error handling and CORS support. 🛠️
- **Static Site**: A simple, customizable HTML frontend in the `public` directory, ready for frameworks like React or Vue. 🌐
- **Netlify CLI Integration**: Streamlined local development and deployment with `netlify dev`. ⚙️
- **TypeScript Support**: Type-safe functions using AWS Lambda types for reliability. 📝
- **Yarn Workflow**: Optimized package management with Yarn. 📦
- **Modular Design**: Easily extend with new functions, frontends, or integrations. 🔧
- **Neon-Ready**: Prepared for Neon Postgres integration with the `neon` function. 🗄️

## 📂 Project Structure
```
netlify-cli-template/
├── netlify/
│   └── functions/
│       ├── hello.ts       # Greets users with query params
│       ├── time.ts        # Returns current server time
│       ├── echo.ts        # Echoes POST request body
│       └── neon.ts        # Placeholder for Neon Postgres integration
├── public/
│   └── index.html         # Static site entry point
├── netlify.toml           # Netlify configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## 🛠️ Prerequisites
- **Node.js**: Version 14 or higher. 🟢
- **Yarn**: Install with `npm install -g yarn`. 📦
- **Netlify CLI**: Install globally with `yarn global add netlify-cli` or locally via `yarn add --dev netlify-cli`. 🌍
- **Git**: For version control and Netlify deployment. 📚

## 🚀 Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/lizzyman04/netlify-cli-template.git
   cd netlify-cli-template
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   ```

3. **Link to Netlify**:
   ```bash
   yarn netlify init
   ```
   Follow the prompts to connect to your Netlify site or create a new one.

## 🎮 Usage
- **Local Development**:
  ```bash
  yarn start
  ```
  Starts a local server at `http://localhost:8888`. Functions are accessible at `http://localhost:8888/.netlify/functions/`.

- **Test Functions**:
  - **hello**: `GET /api/hello?name=YourName`  
    Example: Returns `Hello, YourName!`
  - **time**: `GET /api/time`  
    Example: Returns current UTC time.
  - **echo**: `POST /api/echo` with JSON body  
    Example: Echoes back the payload.
  - **neon**: `GET /extensions/neon`  
    Example: Placeholder for Neon integration.

  Example `curl` for `echo`:
  ```bash
  curl -X POST http://localhost:8888/api/echo -d '{"test": "Hello"}' -H "Content-Type: application/json"
  ```

  Example `curl` for `neon`:
  ```bash
  curl http://localhost:8888/extensions/neon
  ```

- **Deploy to Netlify**:
  ```bash
  yarn deploy
  ```
  Or push to GitHub for continuous deployment. 🚀

- **Type Checking**:
  ```bash
  yarn check-types
  ```

## 🎨 Customization
- **Add Functions**: Create new `.ts` files in `netlify/functions/`. For custom folders (e.g., `netlify/extensions/`), configure `netlify.toml` or use a build script. 🛠️
- **Frontend**: Swap `public/` with frameworks like React, Vue.js, or Astro. 🌐
- **Environment Variables**: Add to `.env` or Netlify’s UI (e.g., `NETLIFY_TOKEN`, `DATABASE_URL` for Neon). 🔑
- **Build Process**: Modify `yarn build` for static site generation. 🏗️
- **Redirects**: Update `netlify.toml` for custom routing rules. 🛤️

## 🔧 Available Functions
- **hello**: Greets users with a `name` query param (e.g., `/api/hello?name=Arlindo`). 👋
- **time**: Returns current UTC time in multiple formats (e.g., `/api/time`). ⏰
- **echo**: Echoes POST request body (e.g., `POST /api/echo`). 📢
- **neon**: Placeholder for Neon Postgres integration (e.g., `GET /extensions/neon`). 🗄️

## 🗄️ Neon Integration
The `neon` function is ready for Neon Postgres integration. To connect:
1. Install the `pg` package: `yarn add pg`.
2. Set `DATABASE_URL` in `.env` or Netlify’s UI with your Neon connection string.
3. Update `neon.ts` with database logic (see commented example in the function).
4. Test queries locally and deploy. 🚀

## 🤝 Contributing
1. Fork the repository. 🍴
2. Create a feature branch (`git checkout -b feature/your-feature`). 🌿
3. Commit changes (`git commit -m 'Add your feature'`). 📝
4. Push to the branch (`git push origin feature/your-feature`). 🚀
5. Open a Pull Request. 🙌

## 📜 License
**MIT License**. See [LICENSE](LICENSE) for details. 📄

## 👤 Author
- **Arlindo Abdul**  
- GitHub: [Lizzyman](https://github.com/lizzyman04) 🧑‍💻

## 📚 Resources
- [Netlify CLI Docs](https://docs.netlify.com/cli/get-started/) 📖
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/) 📘
- [TypeScript Docs](https://www.typescriptlang.org/docs/) 📗
- [Neon Docs](https://neon.tech/docs/) 📙

---

Built with ❤️ using **Netlify CLI** and **Yarn**. Happy coding! 🎉