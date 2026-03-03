/**
 * @module server
 * @description Main server entry point for the Science Facts Generator application.
 * This module initializes and configures an Express.js server with middleware
 * for CORS, JSON parsing, static file serving, and API route handling.
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
// This includes PORT, USE_GEMINI, GEMINI_API_KEY, X_API_KEY, etc.
dotenv.config();

import { router } from "./services/routes.js";

/**
 * Express application instance
 * @type {express.Application}
 */
const server = express();

/**
 * Server port number retrieved from the PORT environment variable
 * @type {string|number}
 */
const PORT = process.env.PORT;

/**
 * Configure Express middleware for the application
 */

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from different domains
server.use(cors());

// Middleware to parse incoming JSON request bodies
server.use(express.json());

// Middleware to serve static files from the 'public' directory (HTML, CSS, client-side JS)
server.use(express.static("public"));

/**
 * Register API routes
 * All routes defined in the router are prefixed with '/api'
 * @see {@link module:routes|routes} for endpoint documentation
 */
server.use('/api', router);

/**
 * Start the Express server and listen for incoming connections
 * Logs a confirmation message when the server is ready to accept requests
 */
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to access the application`);
});
