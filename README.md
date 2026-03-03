# 🔬 Science Facts Generator

A modern, interactive web application that generates and displays fascinating science facts powered by AI. Built with **Express.js** backend and vanilla JavaScript frontend, with support for both **Google Gemini API** and **API Ninjas** for fact generation.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
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
├── public/                 # Frontend static files
│   ├── index.html         # Main HTML page
│   ├── app.js             # Client-side JavaScript (fetches facts)
│   └── style.css          # Styling (dark theme with lime highlights)
├── services/              # Backend service modules
│   ├── geminiService.js   # Google Gemini API integration
│   ├── factApiService.js  # API Ninjas integration
│   └── routes.js          # Express route handlers
├── config/                # Configuration files
│   └── constant.js        # Application constants (SUCCESS, ERROR)
├── docs/                  # Generated JSDoc documentation
├── server.js              # Main Express server
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (PORT, API keys)
└── README.md              # This file
```

---

## 🛠️ Tech Stack

### Backend

- **Express.js** (v5.2.1) - Web framework
- **Node.js** - JavaScript runtime
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

### Frontend

- Vanilla JavaScript (ES6+)
- HTML5
- CSS3 (Grid, Flexbox)
- Google Fonts (Inter)

### AI/Data Services

- **Google Gemini API** - Advanced AI-powered fact generation
- **API Ninjas Facts API** - Alternative fact data source

### Development Tools

- **Nodemon** - Auto-reload on file changes
- **JSDoc** - Code documentation generation
- **Yarn** - Package manager

---

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

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# API Ninjas Key
X_API_KEY=your_api_ninjas_key_here

# Choose which API to use (true = Gemini, false = API Ninjas)
USE_GEMINI=true

# Fallback handling: if true and Gemini fails or times out, automatically fallback to API Ninjas
HANDLE_FALLBACK=true
```

> ⚠️ **Important**: Never commit `.env` file to version control. It contains sensitive API keys.

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

## 🌐 API Endpoints

### Get Science Fact

**Endpoint:** `GET /api/generateFacts`

**Response (Success - 200):**

```json
{
  "status": "SUCCESS",
  "fact": "The human body contains approximately 206 bones in adults."
}
```

**Response (Error - 500):**

```json
{
  "status": "ERROR",
  "error": "Failed to generate science fact"
}
```

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

## 📁 Module Documentation

### Server (`server.js`)

- Initializes Express application
- Configures middleware (CORS, JSON parsing, static files)
- Registers API routes

### Routes (`services/routes.js`)

- Defines `/api/generateFacts` endpoint
- Routes requests to appropriate fact service based on configuration

### Gemini Service (`services/geminiService.js`)

- Integrates with Google Gemini API
- Generates AI-powered science facts
- Handles API errors gracefully

### Fact API Service (`services/factApiService.js`)

- Integrates with API Ninjas Facts API
- Fetches pre-existing science facts
- Manages authentication and error handling

### Frontend (`public/app.js`)

- Loads when DOM is ready
- Fetches facts from backend API
- Displays facts in the UI
- Handles loading/error states

### Constants (`config/constant.js`)

- Centralized status constants
- Standardized response formats

---

## 🎨 User Interface

The application features:

- **Dark Theme**: Black background (#121212) with lime (#adff2f) accents
- **Loading Animation**: Smooth loader while fetching facts
- **Responsive Design**: Adapts to all screen sizes
- **Clean Typography**: Uses Inter font family for modern appearance
- **Centered Layout**: Facts displayed prominently in the center of the screen

---

## 🔄 How It Works

```
User Opens App
    ↓
Page Loads (DOM Ready)
    ↓
app.js Sends Request to /api/generateFacts
    ↓
Server Routes Request Based on USE_GEMINI Flag
    ├─→ If True: Calls Gemini API Service
    │   ├─→ Tries Gemini API once
    │   └─→ If HANDLE_FALLBACK is True and Gemini fails/times out:
    │       └─→ Automatically falls back to API Ninjas
    │       └─→ Fetches pre-existing fact
    │   └─→ If HANDLE_FALLBACK is False:
    │       └─→ Returns error on failure
    └─→ If False: Calls API Ninjas Service directly
        └─→ Fetches pre-existing fact
    ↓
Backend Returns JSON Response
    ├─→ Success: { status: "SUCCESS", fact: "..." }
    └─→ Error: { status: "ERROR", error: "..." }
    ↓
Frontend Displays Fact or Error Message
    ↓
Loading Animation Removed
```

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
