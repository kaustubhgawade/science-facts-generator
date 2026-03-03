/**
 * @module app
 * @description Client-side application script for the Science Facts Generator.
 * This module handles fetching science facts from the backend API and displaying
 * them on the page when the DOM is fully loaded.
 */

/**
 * Initialize the application when the DOM is fully loaded.
 *
 * This event listener handles:
 * - Fetching a science fact from the backend API (/api/generateFacts)
 * - Parsing the JSON response
 * - Displaying the fact on the page
 * - Error handling and user feedback
 * - Removing the loading state from the page
 *
 * @async
 * @listens DOMContentLoaded
 *
 * @description
 * When the page loads, this function:
 * 1. Gets a reference to the fact element in the DOM
 * 2. Makes a fetch request to the backend to retrieve a science fact
 * 3. Parses the response as JSON
 * 4. If successful (status === "SUCCESS"), displays the fact in the DOM
 * 5. If unsuccessful, displays an error message
 * 6. Logs any errors to the console
 * 7. Removes the "loading" class from the body element to show the final content
 *
 * @example
 * // HTML structure expected:
 * // <div id="fact">Loading...</div>
 * // <body class="loading">
 *
 * // Response format expected:
 * // { status: "SUCCESS", fact: "The Great Wall of China..." }
 * // or
 * // { status: "ERROR", error: "Failed to generate science fact" }
 */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Get reference to the DOM element where the fact will be displayed
    const factElement = document.getElementById("fact");

    // Make an asynchronous fetch request to the backend API endpoint
    // This endpoint generates and returns a random science fact
    const response = await fetch("/api/generateFacts", {
      signal: AbortSignal.timeout(30000),
    });

    console.log("Received response from server:", response);

    // Parse the response body as JSON
    const data = await response.json();
    console.log("Parsed JSON data:", data);

    // Check if the API request was successful
    if (data.status === "SUCCESS") {
      // Display the retrieved science fact in the DOM element
      factElement.innerText = data.fact;
    } else {
      // Display an error message if the API returned an error status
      factElement.innerText = "Failed to load science fact. Please try again.";
    }
  } catch (error) {
    // Log any errors encountered during fetch or JSON parsing
    console.error("Error:", error);
  } finally {
    // Remove the "loading" class from the body to stop showing the loading spinner/message
    // This ensures the page displays the final content (fact or error message)
    document.querySelector("body").classList.remove("loading");
  }
});
