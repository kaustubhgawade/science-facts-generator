/**
 * @module routes
 * @description Routes module for the science facts generator API.
 * This module defines all the API endpoints and their request handlers,
 * including logic to determine which service to use for fact generation.
 */

import express from "express";

import { status, endpoints } from "../config/constant.js";
import { generateScienceFact1, generateCategories, generateScienceFactAccordingToCategory } from "./geminiService.js";
import { generateScienceFact2 } from "./factApiService.js";
import logger from "./logger.js";

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
router.get(`/${endpoints.GENERATE_FACTS}`, async (req, res) => {
  try {
    logger.info(`Received request for ${endpoints.GENERATE_FACTS}`);
    let response;

    // Check the USE_GEMINI environment variable to determine which API service to use
    if (process.env.USE_GEMINI === "true") {
      logger.info("Using Gemini Gen API to generate science fact");

      try {
        response = await generateScienceFact1();
      } catch (error) {
        logger.error(error, "Gemini Gen API failed or timed out");

        // Fallback to Ninja API if Gemini fails and fallback handling is enabled
        if (process.env.HANDLE_FALLBACK === "true") {
          logger.info("Switching to fallback Ninja API...");
          response = await generateScienceFact2();
        } else {
          throw error;
        }
      }
    } else {
      logger.info("Using Ninja Fact API to generate science fact");
      response = await generateScienceFact2();
    }

    logger.debug({ response }, "Generated science fact");

    res.status(200).json({
      status: status.SUCCESS,
      fact: response,
    });
  } catch (error) {
    logger.error(error, "Error generating science fact");

    res.status(500).json({
      status: status.ERROR,
      error: "Failed to generate science fact",
    });
  }
});

/**
 * GET /generateFactCategories - Generates a list of random science fact categories.
 *
 * @async
 * @route GET /generateFactCategories
 * @returns {Object} JSON response containing the generated fact categories
 * @returns {string} returns.status - The status of the response (SUCCESS or ERROR)
 * @returns {string} returns.fact - The generated science fact categories (on success)
 * @returns {string} returns.error - Error message (on failure)
 * @returns {number} 200 - Successfully generated a science fact categories
 * @returns {number} 500 - Failed to generate science fact
 *
 * @description
 * This endpoint generates random science fact categories by the Gemini API
 * The generated fact is returned as a JSON response.
 *
 * @example
 * // Request
 * GET /generateFactCategories
 *
 * // Successful Response (200)
 * {
 *   "status": "SUCCESS",
 *   "categories": ["Biology", "Chemistry", "Physics", "Astronomy", "Geology"]
 * }
 *
 * // Error Response (500)
 * {
 *   "status": "ERROR",
 *   "error": "Failed to generate science fact categories"
 * }
 *
 * @see {@link module:geminiService|geminiService} for Gemini API integration
 */
router.get(`/${endpoints.GENERATE_FACT_CATEGORIES}`, async (req, res) => {
  try {
    logger.info(`Received request for ${endpoints.GENERATE_FACT_CATEGORIES}`);

    let response = await generateCategories();

    logger.debug({ response }, "Generated science fact categories");

    res.status(200).json({
      status: status.SUCCESS,
      categories: response,
    });
  } catch (error) {
    logger.error(error, "Error generating science fact categories");

    res.status(500).json({
      status: status.ERROR,
      error: "Failed to generate science fact categories",
    });
  }
});

/**
 * GET /generateFactByCategory - Generates a science fact based on a specific category.
 *
 * @async
 * @route GET /generateFactByCategory
 * @param {string} category - The category of the science fact to generate
 * @returns {Object} JSON response containing the generated fact
 * @returns {string} returns.status - The status of the response (SUCCESS or ERROR)
 * @returns {string} returns.fact - The generated science fact (on success)
 * @returns {string} returns.error - Error message (on failure)
 * @returns {number} 200 - Successfully generated a science fact
 * @returns {number} 500 - Failed to generate science fact
 *
 * @description
 * This endpoint generates a science fact based on the provided category. The category is passed as a query parameter in the request URL. The Gemini API is used to generate a fact that is concise, interesting, and relevant to the specified category. The generated fact is returned as a JSON response.
 * The generated fact is returned as a JSON response.
 *
 * @example
 * // Request
 * GET /generateFactByCategory?category=Biology
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
 */
router.get(`/${endpoints.GENERATE_FACT_BY_CATEGORY}`, async (req, res) => {
  try {
    logger.info(`Received request for ${endpoints.GENERATE_FACT_BY_CATEGORY}`);
    
    const { category } = req.query;
    let response = await generateScienceFactAccordingToCategory(category);

    logger.debug({ response }, "Generated science fact");

    res.status(200).json({
      status: status.SUCCESS,
      fact: response,
    });
  } catch (error) {
    logger.error(error, "Error generating science fact");

    res.status(500).json({
      status: status.ERROR,
      error: "Failed to generate science fact",
    });
  }
});
