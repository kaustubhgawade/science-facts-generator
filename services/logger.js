// This module configures and exports a Pino logger instance for the application. It adjusts settings based on the NODE_ENV environment variable, enabling pretty-printing during development and using the standard JSON output in production.

/**
 * Log Levels (lowest → highest severity)
 *
 * trace  (10) – Very detailed debugging info (function flow, full objects)
 * debug  (20) – Developer debugging info (internal decisions, variable values)
 * info   (30) – Normal application events (server start, request received)
 * warn   (40) – Unexpected but non-breaking issues (fallback triggered)
 * error  (50) – Operational errors (exceptions, failed API calls)
 * fatal  (60) – Critical failure, app may exit
 *
 * Note:
 * Setting LOG_LEVEL determines minimum level shown.
 * Example:
 *   LOG_LEVEL=debug → shows debug, info, warn, error, fatal
 *   LOG_LEVEL=info  → shows info, warn, error, fatal
 *   LOG_LEVEL=trace → shows everything
 */

import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";
const logLevel = process.env.LOG_LEVEL || "info";
console.log(process.env.NODE_ENV, process.env.LOG_LEVEL);
console.log(isProduction, logLevel);


const logger = pino({
  // fall back to 'info' when LOG_LEVEL isn't defined to avoid Pino error
  level: logLevel || "debug",

  transport: !isProduction
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss",
          ignore: "pid,hostname",
        },
      }
    : undefined,
});

export default logger;

