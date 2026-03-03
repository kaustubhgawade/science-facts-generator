/**
 * @module geminiService
 * @description Service module for generating science facts using Google Gemini API.
 * This module provides functionality to interact with the Gemini API to generate
 * random science facts based on predefined prompts.
 */

import { GoogleGenAI } from "@google/genai";
import { withTimeout } from "./utility.js";
import logger from "./logger.js";

/**
 * Generates a random science fact using the Google Gemini API.
 *
 * @async
 * @function generateScienceFact1
 * @returns {Promise<string>} A promise that resolves to the generated science fact text
 * @throws {Error} Throws an error if the API request fails or the response is invalid
 *
 * @example
 * const fact = await generateScienceFact1();
 * logger.info(fact); // "The Earth's core is as hot as the surface of the sun."
 *
 * @description
 * Uses the Gemini API with the "gemini-3-flash-preview" model to generate concise,
 * interesting science facts. The API key is automatically retrieved from the
 * GEMINI_API_KEY environment variable. Generated facts are limited to 1-2 sentences
 * and do not exceed 35 words to ensure brevity and readability.
 */
export async function generateScienceFact1() {
  try {
    // Initialize the Google Gemini AI client with default configuration
    // The API key is automatically loaded from the GEMINI_API_KEY environment variable
    const ai = new GoogleGenAI({});
    const controller = new AbortController();

    // Define the prompt for generating science facts
    const prompt = `
    Generate a random science fact. The fact should be concise and interesting.
    It should be a max of 1-2 sentence and should not exceed 35 words.
    Every time you generate a fact, it should be different from the previous one.
    `;

    let response;

    // Check if fallback mechanism is enabled to determine if timeout protection is needed
    if (process.env.HANDLE_FALLBACK === "true") {
      // Enable timeout protection: if request takes longer than 20 seconds, abort and handle via fallback
      const controller = new AbortController();
      const apiCallWithSignal = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        signal: controller.signal,
      });
      response = await withTimeout(apiCallWithSignal, 20000, controller);
    } else {
      // No fallback enabled: await response without timeout constraints
      response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        signal: controller.signal,
      });
    }

    logger.info(response, "Received response from Gemini API:");
    logger.debug({ response }, "Gemini raw response");

    // Extract and return the text content from the API response
    return response.text;
  } catch (error) {
    // Throw any errors encountered during API communication or processing
    throw error;
  }
}
