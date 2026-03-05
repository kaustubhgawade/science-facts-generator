/**
 * @module config/constant
 * @description Central configuration module for application-wide constants.
 * This module defines status response constants used throughout the API
 * for standardized response status handling and error reporting.
 */

/**
 * Application constants object containing standardized status codes.
 *
 * @type {Object}
 * @property {string} SUCCESS - Indicates a successful operation (value: "SUCCESS")
 * @property {string} ERROR - Indicates an operation failure or error (value: "ERROR")
 *
 * @description
 * These constants are used in API responses to indicate whether an operation
 * succeeded or failed. Using constants instead of string literals helps prevent
 * typos and makes the codebase more maintainable.
 *
 * @example
 * // Server response on success
 * res.json({
 *   status: constants.SUCCESS,
 *   fact: "Science fact here..."
 * });
 *
 * @example
 * // Server response on error
 * res.json({
 *   status: constants.ERROR,
 *   error: "Failed to generate science fact"
 * });
 *
 * @example
 * // Client-side usage
 * if (data.status === constants.SUCCESS) {
 *   // Handle success
 * }
 */
export const status = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export const types = {
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
  ARRAY: "array",
  OBJECT: "object",
};

export const endpoints = {
  GENERATE_FACTS: "generateFacts",
  GENERATE_FACT_CATEGORIES: "generateFactCategories",
  GENERATE_FACT_BY_CATEGORY: "generateFactByCategory",
};
