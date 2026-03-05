# Science Facts Generator API - Postman Collections

This folder contains Postman API collections and individual request files for the Science Facts Generator application.

## Files

### Collection File

- **science-facts-api.postman_collection.json** - Complete Postman collection containing all API endpoints

### Individual Request Files

- **1-generate-random-fact.json** - Generate a random science fact
- **2-generate-fact-categories.json** - Generate list of science fact categories
- **3-generate-fact-by-category.json** - Generate a fact for a specific category

## How to Use

### Method 1: Import Collection in Postman

1. Open Postman
2. Click **Import** button
3. Select **science-facts-api.postman_collection.json**
4. The collection will be imported with all endpoints ready to use

### Method 2: Use Individual Request Files

1. Open Postman
2. Click **Import** button
3. Select individual `.json` files as needed

## API Endpoints

### 1. Generate Random Fact

- **Method:** GET
- **URL:** `http://localhost:3000/api/generateFacts`
- **Description:** Generates a random science fact using either Gemini API or API Ninjas based on environment configuration

**Response:**

```json
{
  "status": "SUCCESS",
  "fact": "The human body contains approximately 206 bones."
}
```

### 2. Generate Fact Categories

- **Method:** GET
- **URL:** `http://localhost:3000/api/generateFactCategories`
- **Description:** Generates a list of 5 random science fact categories using Gemini API

**Response:**

```json
{
  "status": "SUCCESS",
  "categories": ["Biology", "Chemistry", "Physics", "Astronomy", "Geology"]
}
```

### 3. Generate Fact by Category

- **Method:** GET
- **URL:** `http://localhost:3000/api/generateFactByCategory?category=Biology`
- **Query Parameters:**
  - `category` (required) - The science category for which to generate a fact

**Response:**

```json
{
  "status": "SUCCESS",
  "fact": "The human brain uses approximately 20% of the body's total energy."
}
```

## Environment Setup

Make sure the following environment variables are set in your `.env` file:

- `NODE_ENV` - Application environment (development/production)
- `LOG_LEVEL` - Logging level (trace, debug, info, warn, error, fatal)
- `USE_GEMINI` - Whether to use Gemini API ("true" or "false")
- `HANDLE_FALLBACK` - Enable fallback to API Ninjas ("true" or "false")
- `GEMINI_API_KEY` - Google Gemini API key (if using Gemini)
- `X_API_KEY` - API Ninjas API key (if using API Ninjas)

## Server Configuration

Default server runs on: `http://localhost:3000`

To use a different host/port, update the URLs in the collection or environment variables.
