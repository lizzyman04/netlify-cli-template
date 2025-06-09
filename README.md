# Netlify CLI Template

A robust and adaptable template for building serverless applications and static sites with Netlify CLI. This project provides a modern setup with TypeScript, multiple serverless functions, and a simple static frontend, ideal for blogs, APIs, or dynamic web apps.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-NETLIFY-SITE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)

## Features
- **Serverless Functions**: Three TypeScript-based functions (`hello`, `time`, `echo`) with error handling and CORS support.
- **Static Site**: A simple HTML frontend in the `public` directory, customizable for any framework.
- **Netlify CLI Integration**: Streamlined local development and deployment with `netlify dev`.
- **TypeScript Support**: Type-safe functions with AWS Lambda types.
- **Yarn Workflow**: Optimized for Yarn as the package manager.
- **Modular Design**: Easily extend with new functions, frontends, or integrations.

## Project Structure
```
netlify-cli-template/
├── netlify/
│   └── functions/
│       ├── hello.ts       # Greedy function with query params
│       ├── time.ts        # Returns current server time
│       └── echo.ts        # Echoes POST request body
├── public/
│   └── index.html         # Static site entry point
├── netlify.toml           # Netlify configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Prerequisites
- **Node.js**: Version 14 or higher.
- **Yarn**: Install with `npm install -g yarn`.
- **Netlify CLI**: Install globally with `yarn global add netlify-cli` or locally via `yarn add --dev netlify-cli`.
- **Git**: For version control and Netlify deployment.

## Installation
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

## Usage
- **Local Development**:
  ```bash
  yarn start
  ```
  Opens a local server at `http://localhost:8888`. Functions are available at `http://localhost:9000/.netlify/functions/`.

- **Test Functions**:
  - `hello`: `GET /api/hello?name=YourName` (e.g., `Hello, YourName!`)
  - `time`: `GET /api/time` (returns current UTC time)
  - `echo`: `POST /api/echo` with JSON body (echoes back the payload)

  Example `curl` for `echo`:
  ```bash
  curl -X POST http://localhost:9000/api/echo body-d '{"test": "Hello"}' -H "Content-Type: application/json"
  ```

- **Deploy to Netlify**:
  ```bash
  yarn deploy
  ```
  Or push to GitHub for continuous deployment.

- **Type Checking**:
  ```bash
  yarn check-types
  ```

## Customization
- **Add Functions**: Create new `.ts` files in `netlify/functions/`.
- **Frontend**: Replace `public/` with a framework like React, Vue.js, or Astro).
- **Environment Variables**: Add to `.env` or Netlify’s UI (e.g., `NETLIFY_TOKEN`).
- **Build Process**: Update `yarn build` for static site generation.
- **Redirects**: Modify `netlify.toml` for custom routing rules.

## Available Functions
- `hello`: Greets users based on `name` query param (e.g., `/api/hello?name=Arlindo`).
- `time`: Returns current UTC time in multiple formats (e.g., `/api/time`).
- `echo`: Echoes POST request body (e.g., `POST /api/echo`).

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License
- **License**: MIT License. See [LICENSE](LICENSE) for details.

## Author
- **Arlindo Abdul**
- GitHub: [Lizzyman](https://github.com/lizzyman04)

## Resources
- [Netlify CLI Docs](https://docs.netlify.com/cli/get-started/)
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

---

Built with ❤️ using Netlify CLI and Yarn.