/**
 * @module geminiService
 * @description Service module for generating science facts using Google Gemini API.
 * This module provides functionality to interact with the Gemini API to generate
 * random science facts based on predefined prompts.
 */

import { GoogleGenAI } from "@google/genai";

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
 * console.log(fact); // "The Earth's core is as hot as the surface of the sun."
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

    // Define the prompt for generating science facts
    // Constraints enforce concise, interesting, and factual content
    const prompt = `
    Generate a random science fact. The fact should be concise and interesting.
    It should be a max of 1-2 sentence and should not exceed 35 words.
    `;

    // Send the prompt to the Gemini API and await the response
    // The "gemini-3-flash-preview" model is optimized for fast, reliable responses
    const apiCall = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      signal: controller.signal,
    });

    // Wait max 20 seconds
    const response = await withTimeout(apiCall, 20000, controller);

    // console.log("Received response from Gemini API:", response);
    // console.dir(response, { depth: null });

    // Extract and return the text content from the API response
    return response.text;
  } catch (error) {
    // Re-throw any errors encountered during API communication or processing
    // This allows calling functions to handle errors appropriately
    throw error;
  }
}
