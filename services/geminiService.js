/**
 * @module geminiService
 * @description Service module for generating text content using Google Gemini GenAI API.
 * This module provides functionality to interact with the Gemini API to generate
 * science facts and categories based on predefined prompts.
 */

import { GoogleGenAI } from "@google/genai";
import { withTimeout } from "./utility.js";
import logger from "./logger.js";
import { types } from "../config/constant.js";

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

    if (process.env.HANDLE_FALLBACK === "true") {
      const controller = new AbortController();
      const apiCallWithSignal = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        signal: controller.signal,
      });
      response = await withTimeout(apiCallWithSignal, 20000, controller);
    } else {
      response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
    }

    logger.info(response.text, "Received response from Gemini API:");
    logger.debug({ response }, "Gemini raw response");

    return response.text;
  } catch (error) {
    throw error;
  }
}

/**
 * Generates an array of science categories using the Google Gemini API.
 *
 * @async
 * @function generateCategories
 * @returns {Promise<string[]>} A promise that resolves to an array of generated science categories
 * @throws {Error} Throws an error if the API request fails or the response is invalid
 *
 * @example
 * const categories = await generateCategories();
 * logger.info(categories); // ["Biology", "Chemistry", "Physics", "Astronomy", "Geology"]
 *
 * @description
 * Uses the Gemini API with the "gemini-3-flash-preview" model to generate concise,
 * interesting science categories. The API key is automatically retrieved from the
 * GEMINI_API_KEY environment variable. Generated categories are limited to 5 types.
 */
export async function generateCategories() {
  try {
    const ai = new GoogleGenAI({});

    const schema = {
      description: "List of science categories",
      type: types.ARRAY,
      items: {
        type: types.STRING,
        description: "Name of the category",
      },
    };

    const prompt = `Give me 5 random science categories people would be interested in knowing about.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: schema,
      },
    });
    logger.debug({ response }, "Gemini raw response");

    // parse text payload after initial logging
    const parsed = JSON.parse(response.text);

    logger.info({ parsed }, "Received response from Gemini API:");
    return parsed;
  } catch (error) {
    throw error;
  }
}

/**
 * Generates a specific science fact according to provided category using the Google Gemini API.
 *
 * @async
 * @function generateScienceFactAccordingToCategory
 * @param {string} category - The category of the science fact to generate
 * @returns {Promise<string>} A promise that resolves to the generated science fact text
 * @throws {Error} Throws an error if the API request fails or the response is invalid
 *
 * @example
 * const fact = await generateScienceFactAccordingToCategory("Biology");
 * logger.info(fact); // "The Earth's core is as hot as the surface of the sun."
 *
 * @description
 * Uses the Gemini API with the "gemini-3-flash-preview" model to generate concise,
 * interesting science facts. The API key is automatically retrieved from the
 * GEMINI_API_KEY environment variable. Generated facts are limited to 1-2 sentences
 * and do not exceed 35 words to ensure brevity and readability.
 */
export async function generateScienceFactAccordingToCategory(category) {
  try {
    // Initialize the Google Gemini AI client with default configuration
    // The API key is automatically loaded from the GEMINI_API_KEY environment variable
    const ai = new GoogleGenAI({});
    const controller = new AbortController();

    // Define the prompt for generating science facts
    const prompt = `
    Generate a ${category} category science fact. The fact should be concise and interesting.
    It should be a max of 1-2 sentence and should not exceed 35 words.
    Every time you generate a fact, it should be different from the previous one.
    `;

    let response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    logger.info(response.text, "Received response from Gemini API:");
    logger.debug({ response }, "Gemini raw response");

    return response.text;
  } catch (error) {
    throw error;
  }
}
