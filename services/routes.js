/**
 * @module routes
 * @description Routes module for the science facts generator API.
 * This module defines all the API endpoints and their request handlers,
 * including logic to determine which service to use for fact generation.
 */

import express from "express";

import { constants } from "../config/constant.js";
import { generateScienceFact1 } from "./geminiService.js";
import { generateScienceFact2 } from "./factApiService.js";

/**
 * Express Router instance for defining and handling API routes
 * @type {express.Router}
 */
export const router = express.Router();

/**
 * GET /generateFacts - Generates a random science fact.
 *
 * @async
 * @route GET /generateFacts
 * @returns {Object} JSON response containing the generated fact
 * @returns {string} returns.status - The status of the response (SUCCESS or ERROR)
 * @returns {string} returns.fact - The generated science fact (on success)
 * @returns {string} returns.error - Error message (on failure)
 * @returns {number} 200 - Successfully generated a science fact
 * @returns {number} 500 - Failed to generate science fact
 *
 * @description
 * This endpoint generates a random science fact by delegating to either the Gemini API
 * or the API Ninjas API based on the USE_GEMINI environment variable.
 * If USE_GEMINI is set to "true", it uses the Google Gemini API; if it fails or times out
 * and HANDLE_FALLBACK is enabled, it automatically falls back to the API Ninjas Facts API.
 * Otherwise, it uses the API Ninjas Facts API directly.
 * The generated fact is returned as a JSON response.
 *
 * @example
 * // Request
 * GET /generateFacts
 *
 * // Successful Response (200)
 * {
 *   "status": "SUCCESS",
 *   "fact": "The human body contains approximately 206 bones."
 * }
 *
 * // Error Response (500)
 * {
 *   "status": "ERROR",
 *   "error": "Failed to generate science fact"
 * }
 *
 * @see {@link module:geminiService|geminiService} for Gemini API integration
 * @see {@link module:factApiService|factApiService} for API Ninjas integration
 */
router.get("/generateFacts", async (req, res) => {
  try {
    // Log the incoming request for debugging and monitoring purposes
    console.log("Received request for /generateFacts");
    let response;
    // Check the USE_GEMINI environment variable to determine which API service to use
    if (process.env.USE_GEMINI === "true") {
      // Use Google Gemini API for science fact generation
      console.log("Using Gemini Gen API to generate science fact");

      try {
        response = await generateScienceFact1();
      } catch (error) {
        console.error("Gemini failed or timed out", error);
        
        // Fallback mechanism: If HANDLE_FALLBACK is enabled, wrap Gemini API call in try-catch
        // to gracefully handle failures or timeouts by switching to the API Ninjas Facts API
        if (process.env.HANDLE_FALLBACK === "true") {
          console.log("Switching to fallback Ninja API...");
          response = await generateScienceFact2();
        }
      }
    } else {
      // Use API Ninjas API as the fallback fact generation service
      console.log("Using Ninja Fact API to generate science fact");
      response = await generateScienceFact2();
    }

    // Log the successfully generated fact for debugging purposes
    console.log("Generated science fact:", response);

    // Send a successful response with status and the generated fact
    res.status(200).json({
      status: constants.SUCCESS,
      fact: response,
    });
  } catch (error) {
    // Log the error for monitoring and troubleshooting
    console.error("Error generating science fact:", error);

    // Send an error response with appropriate HTTP status code and error message
    res.status(500).json({
      status: constants.ERROR,
      error: "Failed to generate science fact",
    });
  }
});
