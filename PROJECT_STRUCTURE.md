# Project Architecture & Codebase Overview

This document outlines the directory structure and significance of each file and folder in this professional-grade Node.js/Express application. This architecture ensures code maintainability, scalability, and clean separation of concerns for a production-level codebase.

---

## 📁 Root Directory

The root directory contains configuration files that govern the environment, dependencies, source control, and formatting standards.

| File / Folder | Production Significance |
|---------------|-------------------------|
| **`package.json`** | The manifest of the project. It handles dependency management, semantic versioning, and defines automation scripts (like `dev`, `build`, `start`). Crucial for reproducible builds across different environments. |
| **`.env`** | Stores sensitive environment variables (like API keys, DB credentials, Ports). **Never committed to version control.** Vital for isolating configuration from code across Dev, Staging, and Production environments. |
| **`.env.example`** | A template reflecting the keys expected in the `.env` file without the actual sensitive values. Helps new developers quickly set up their local environment. |
| **`.gitignore`** | Tells Git which files and folders to ignore (e.g., `/node_modules`, `.env`). Prevents accidental commits of sensitive data and heavy dependency folders. |
| **`.prettierrc`** | Configuration file for Prettier. Enforces a strict, consistent code formatting style across the entire team, reducing review friction and syntactic debates. |
| **`.prettierignore`** | Specifies files/folders that Prettier should not re-format, saving processor time and avoiding conflicts with built or external files. |
| **`public/temp/`** | A directory to temporarily store static assets or user-uploaded files (using tools like `multer`) locally on the server before they are processed or relocated to a cloud bucket (like AWS S3 or Cloudinary). |

---

## 📁 Source Directory (`/src`)

The `src` directory contains the actual business logic, APIs, and infrastructure connections for the application.

### 📄 Core Files

| File | Production Significance |
|------|-------------------------|
| **`index.js`** | The absolute entry point of the application. Its sole responsibility is to initiate connections to infrastructural systems (like the Database) and, upon success, start the server listening on a port. Keeps server startup decoupled from application logic. |
| **`app.js`** | The core Express application module. It is responsible for configuring the app server, defining global middlewares (like CORS, body parsers, and cookie parsers), and registering route prefixes. It essentially acts as the backbone configuration for the Express app. |
| **`constants.js`** | A centralized configuration file for static system values (like the database name `DB_NAME`, enums, or magic strings/numbers). This ensures consistency and makes future system-wide naming changes a single-line edit. |

---

### 📂 Architecture Directories

| Directory | Production Significance |
|-----------|-------------------------|
| **`db/`** | Manages database configuration and connection logic. By keeping DB connectivity entirely separate from the server configuration (`index.js`), it makes testing easier and supports multiple database connection instances if required. |
| **`models/`** | Houses Mongoose/Database Schemas and Data Models. It represents the data layer, defining the structure, relationships, and validation constraints of data stored in the DB. Keeps data integrity strictly enforced. |
| **`controllers/`** | Contains the core business logic of the application. Controllers extract variables from the request (params, body, headers), process data, and generate an appropriate response. Separating this from routes ensures code is highly testable and readable. |
| **`routes/`** | Acts as the traffic director of the application. It defines the URL endpoints by HTTP methods (GET, POST, PUT, DELETE) and maps them to their respective Controller functions. |
| **`middlewares/`** | Reusable functions that have access to the `Request` and `Response` objects. They are used to intercept requests for tasks like Authentication/Authorization checks, logging, file uploads (Multer), and data validation before reaching the controller. |
| **`utils/`** | A directory for shared helper functions, utility classes, and standardized toolkits, ensuring DRY (Don't Repeat Yourself) code conventions across the large codebase. |

### 🛠️ Key Utility Files (Inside `/src/utils`)

| File | Production Significance |
|------|-------------------------|
| **`asyncHandler.js`** | A wrapper utility function to gracefully handle Promises and async Express routes. It eliminates the need for repetitive `try-catch` blocks in every single controller, passing up errors seamlessly to central error handling middleware. |
| **`ApiError.js`** | A custom class extending Node.js's built-in `Error`. It standardizes error outputs (status codes, messaging, stack traces) preventing unexpected crashing and ensuring the frontend receives predictable, uniform error structures. |
| **`ApiResponse.js`** | A standardized class for successful API JSON responses. It guarantees that every single success response generated by the server has an identical structure (success flag, data object, status code, and message). |