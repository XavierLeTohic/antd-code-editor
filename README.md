# Antd Code Editor

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern code editor integration for React applications, built with [monaco-editor](https://microsoft.github.io/monaco-editor/) and [Ant Design](https://ant.design/).

> [!IMPORTANT]  
> 🚧 **Early Development Stage** 🚧
> 
> This project is in very early development. Currently working features:
> - Basic Monaco editor rendering
> - File explorer with creation of files and folders
> 
> Most features are still under development.

## Roadmap

- 📁 File Tree Navigation ✅
- 🔄 Drag and Drop Support
- ⚙️ Customizable Editor Settings
- 📑 Multi-model Editor Support
- 🔍 Fuzzy File Search
- 🔎 Full-text Search (WASM-powered)
- 💾 Multiple Storage Options:
  - In-Memory
  - FileSystem
  - Git (WASM-powered)
  - S3
- 🎨 Themeable (with potential for non-Antd version)

## Getting Started

### Installation

```bash
npm install
```

### Development

Build the library in watch mode:
```bash
npm run dev
```

### Running the Example

1. Navigate to the example:
   ```bash
   cd examples/basic-example
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Link React dependencies:
   ```bash
   npm link ../../node_modules/react ../../node_modules/react-dom
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## License

MIT