/**
 * @module factApiService
 * @description Service module for fetching science facts from the API Ninjas API.
 * This module provides functionality to retrieve random facts from an external
 * API and handle the response data appropriately.
 */

/**
 * Fetches a random science fact from the API Ninjas Facts API.
 * 
 * @async
 * @function generateScienceFact2
 * @returns {Promise<string>} A promise that resolves to a fact string from the API response
 * @throws {Error} Throws an error if the API request fails, authentication fails, or parsing fails
 * 
 * @example
 * const fact = await generateScienceFact2();
 * console.log(fact); // "The Great Wall of China is not visible from space."
 * 
 * @description
 * Makes a GET request to the API Ninjas /facts endpoint to retrieve random facts.
 * Authentication is handled via the X-Api-Key header, which is retrieved from the
 * X_API_KEY environment variable. The first fact from the response array is extracted
 * and returned as a string.
 * 
 * @see {@link https://api-ninjas.com/api/facts|API Ninjas Facts API}
 */
export async function generateScienceFact2() {
  try {
    // API endpoint for retrieving random facts from API Ninjas
    const URL = "https://api.api-ninjas.com/v1/facts";

    // Retrieve the API authentication key from environment variables
    // This key is required for successful authentication with the API Ninjas service
    const X_API_KEY = process.env.X_API_KEY;

    // Send a GET request to the API Ninjas endpoint with proper authentication headers
    const response = await fetch(URL, {
      headers: {
        "X-Api-Key": X_API_KEY,
      },
    });

    // Parse the response body as JSON
    const data = await response.json();

    // Console log for debugging purposes to inspect the API response structure
    console.log("Received response from Api Ninjas API:", data);

    // Extract and return the fact text from the first item in the response array
    return data[0].fact;
  } catch (error) {
    // Re-throw any errors encountered during the API request or data processing
    // This allows calling functions to handle errors appropriately
    throw error;
  }
}
