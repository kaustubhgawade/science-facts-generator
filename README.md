# 🔬 Science Facts Generator

A modern, interactive web application that generates and displays fascinating science facts powered by AI. Built with **Express.js** backend and vanilla JavaScript frontend, with support for both **Google Gemini API** and **API Ninjas** for fact generation.

![Version](https://img.shields.io/badge/version-1.2.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node.js](https://img.shields.io/badge/node.js-v16+-green)

---

## ✨ Features

- 🎯 **Dual API Support**: Switch between Google Gemini AI and API Ninjas for fact generation
- 🔄 **Automatic Fallback**: When using Gemini, tries once and automatically falls back to API Ninjas if it fails or times out (configurable)
- 🚀 **Lightning Fast**: Optimized performance with async/await patterns
- 🎨 **Modern UI**: Clean, responsive interface with loading animations
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- 🔧 **Environment Configuration**: Easy-to-use .env configuration system
- 📚 **JSDoc Documented**: Comprehensive code documentation for all modules
- 🛠️ **Development Ready**: Includes nodemon for hot-reload during development

---

## 🏗️ Project Structure

```
science-facts-generator/
│
├── .github/                   # GitHub configuration
│   └── workflows/             # GitHub Actions workflows
│       └── release.yml        # Automated release workflow
│
├── .postman/                  # Postman collection for testing API endpoints
|
├── config/                    # Configuration files
│   └── constant.js            # Application constants (STATUS, TYPES, ENDPOINTS)
|
├── docs/                      # Generated JSDoc documentation
│                                    
├── public/                    # Frontend static files
│   ├── index.html             # Main HTML page
│   ├── categories.html        # Categories HTML page
│   ├── app.js                 # Client-side JavaScript (fetches facts)
│   ├── generateCategory.js    # Client-side JavaScript (fetches facts based on random categories)
│   └── style.css              # Styling (dark theme with lime highlights)
|
├── services/                  # Backend service modules
│   ├── geminiService.js       # Google Gemini API integration
│   ├── factApiService.js      # API Ninjas integration
│   ├── logger.js              # Logger mechanism integration
│   ├── utility.js             # Other utility functions
│   └── routes.js              # Express route handlers
|
├── server.js                  # Main Express server entry point
├── env.js                     # Loads environment variables using dotenv
│
├── .env                       # Local environment variables (not committed)
├── .env.example               # Example environment configuration for developers
│
├── .gitignore                 # Git ignored files and folders
├── CHANGELOG.md               # Project change history
├── LICENSE                    # Project license
│
├── package.json               # Project dependencies and scripts
├── yarn.lock                  # Yarn dependency lock file
│
└── README.md                  # Project documentation
```

---

## 🛠️ Tech Stack

### Backend

- **Node.js** – JavaScript runtime environment
- **Express.js (v5.2.1)** – Web framework for building REST APIs
- **CORS** – Enables cross-origin requests
- **dotenv** – Environment configuration management
- **Pino** – High-performance structured logging

### Frontend

- Vanilla JavaScript (ES6+)
- HTML5
- CSS3
- Google Fonts (Inter)

### AI / Data Services

- **Google Gemini API** – AI-powered science fact generation
- **API Ninjas Facts API** – Alternative data source used as fallback

### Development Tools

- **Nodemon** – Auto-reloads the server during development
- **JSDoc** – Generates project documentation
- **Yarn** – Package manager
- **pino-pretty** – Pretty prints logs in development

### Release & Versioning

- **standard-version** – Automated semantic versioning and changelog generation

### API Testing

- **Postman** – API testing via included Postman collection

### CI / Automation

- **GitHub Actions** – Automated release workflow

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Yarn** (optional, but recommended) - `npm install -g yarn`
- **API Keys**:
  - Google Gemini API Key - [Get it here](https://ai.google.dev/)
  - API Ninjas API Key - [Get it here](https://api-ninjas.com/api/facts)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kaustubhgawade/science-facts-generator.git
cd science-facts-generator
```

### 2. Install Dependencies

```bash
# Using Yarn (recommended)
yarn install

# OR using npm
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
# Server Port
PORT=3000

# ENVIRONMENT
ENV=development

# LOG_LEVEL
LOG_LEVEL=debug

# API KEYS
GEMINI_API_KEY=<your_gemini_api_key_here>
X_API_KEY=<your_api_ninja_key_here>

# Choose which API to use (true = Gemini, false = API Ninjas)
USE_GEMINI=true

# Fallback handling: if true and Gemini fails or times out, automatically fallback to API Ninjas
HANDLE_FALLBACK=true
```

> ⚠️ **Important**: Never commit `.env` file to version control. It contains sensitive API keys.

> ⚠️ **Quick Setup**: Use .env.example file contents in .env file and replace API keys

---

## 🎮 Usage

### Development Mode (with hot-reload)

```bash
yarn dev
# or
npm run dev
```

Server runs on `http://localhost:3000` with automatic restart on file changes.

### Production Mode

```bash
yarn start
# or
npm start
```

Server runs on `http://localhost:3000` (no auto-reload).

### Generate Documentation

```bash
yarn docs
# or
npm run docs
```

Generates HTML documentation in the `docs/` directory.

---

## 📮 Using the Postman Collection

This repository includes a **Postman collection** that allows you to quickly test all available API endpoints without manually creating requests.

Collection location: `.postman/`

### Import the Collection into Postman

1. Open **Postman**
2. Click the **Import** button (top left)
3. Select **Upload Folder**
4. Navigate to the project folder and select
5. Click **Import**

The collection will now appear in your **Postman workspace** with all predefined API requests.

---

## ⚙️ Configuration

### Switching Between APIs

#### Use Google Gemini API (AI-Powered)

```env
USE_GEMINI=true
GEMINI_API_KEY=your_key_here
```

**Advantages:**

- Advanced AI-generated facts
- More contextual and detailed information
- Supports multiple topics

#### Use API Ninjas (Data-Based)

```env
USE_GEMINI=false
X_API_KEY=your_key_here
```

**Advantages:**

- Reliable fact database
- Fast response times
- No AI generation overhead

### Environment Variables

| Variable          | Description                                             | Required                                           |
| ----------------- | ------------------------------------------------------- | -------------------------------------------------- |
| `PORT`            | Server port number                                      | ✅ Yes                                             |
| `GEMINI_API_KEY`  | Google Gemini API key                                   | ✅ If `USE_GEMINI=true`                            |
| `X_API_KEY`       | API Ninjas API key                                      | ✅ If `USE_GEMINI=false` OR `HANDLE_FALLBACK=true` |
| `USE_GEMINI`      | Choose API service (true/false)                         | ✅ Yes                                             |
| `HANDLE_FALLBACK` | Enable fallback to API Ninjas if Gemini fails/times out | ❌ No (default: false)                             |

---


## 🎨 User Interface

The application features:

- **Dark Theme**: Black background (#121212) with lime (#adff2f) accents
- **Loading Animation**: Smooth loader while fetching facts
- **Responsive Design**: Adapts to all screen sizes
- **Clean Typography**: Uses Inter font family for modern appearance
- **Centered Layout**: Facts displayed prominently in the center of the screen

---

## 📚 Code Documentation

All modules include comprehensive JSDoc comments. Generate HTML documentation:

```bash
yarn docs
```

This creates a `docs/` folder with complete API reference, type definitions, and usage examples.

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Kaustubh Gawade**

- Email: kaustubhgawade2602@gmail.com
- GitHub: [kaustubhgawade](https://github.com/kaustubhgawade)
- Repository: [science-facts-generator](https://github.com/kaustubhgawade/science-facts-generator)

---

## 🐛 Troubleshooting

### Issue: API Key Error

**Solution:** Verify your API keys in the `.env` file are correct and have not expired.

### Issue: Port Already in Use

**Solution:** Change the `PORT` in `.env` to an available port (e.g., 3001, 3002).

### Issue: CORS Error in Browser

**Solution:** Ensure the server is running and the fetch URL matches the server address.

### Issue: Fact Not Loading

**Solution:** Check browser console for errors, verify API service credentials, ensure internet connection.

---

## 📞 Support

For issues and feature requests, please open an [issue on GitHub](https://github.com/kaustubhgawade/science-facts-generator/issues).

---

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [Google Gemini API](https://ai.google.dev/)
- [API Ninjas](https://api-ninjas.com/)
- [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JSDoc Tutorial](https://jsdoc.app/)

---

**Enjoy exploring amazing science facts! 🚀🔬**
