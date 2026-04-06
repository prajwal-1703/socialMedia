# Professional Project Setup Guide

Follow these steps to initialize and structure a professional-grade Node.js project.

## 1. Project Initialization
Start by creating your `package.json` with the default settings:
```bash
npm init -y
```

## 2. Directory Setup
Create the public directory and a temporary sub-directory:
```bash
mkdir -p public/temp
```

## 3. Git Configuration for Empty Folders
Add a `.gitkeep` file inside `./public/temp` to ensure the directory is tracked by Git.

## 4. Environment Variables
Create `.env` and `.env.example` files in the root directory to manage your environment variables.

## 5. Git Ignore Setup
Create a `.gitignore` file in your root folder. Generate its contents based on the technologies you are using (you can use tools like [gitignore.io](https://gitignore.io)).

## 6. Configure `package.json`
Update your `package.json` to specify your preferred module system:
```json
"type": "commonjs" 
// or
"type": "module"
```

## 7. Install Development Dependencies
Install `nodemon` to automatically restart your application during development:
```bash
npm install --save-dev nodemon
# or
npm i -D nodemon
```

## 8. Install Core Dependencies
Install the essential packages for your application, including `express` for the server, `mongoose` for database modeling, and `dotenv` for environment variable management:
```bash
npm install express mongoose dotenv
```

## 9. Add Scripts
Add a `dev` script to your `package.json` to run your server via `nodemon`:
```json
"scripts": {
  "dev": "nodemon ./src/index.js"
}
```

## 10. Create the Source Directory
Create the main source directory:
```bash
mkdir src
```

## 11. Create Core Files
Using your terminal or code editor, navigate down to the `src` folder and create your initial application files:
```bash
touch ./src/app.js ./src/constants.js ./src/index.js
```

## 12. Create the Project Sub-directories
Inside the `./src` directory, create folders to organize the architecture of your application:
```bash
cd src
mkdir controllers db middlewares models routes utils
```

## 13. Setup Prettier (Recommended)
Install `prettier` as a development dependency to ensure consistent code formatting across the project:
```bash
npm install --save-dev prettier
# or
npm i -D prettier
```

## 14. Configure Prettier Formatting
Create a `.prettierrc` file in the root directory and add the following configuration:
```json
{
  "singleQuote": false,
  "bracketSpacing": true,
  "tabWidth": 2,
  "semi": true,
  "trailingComma": "es5"
}
```

## 15. Configure Prettier Ignore
To prevent Prettier from incorrectly formatting certain generated configuration files, add a `.prettierignore` file with the following contents:
```plaintext
/.vscode
/node_modules
/dist
*.env
.env
.env.*
```


## 16. Setup MongoDB Using Docker
Host a MongoDB database locally using Docker with the following command:
```bash
docker run -d --name mongo-social -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=strongpassword -e MONGO_INITDB_DATABASE=socialApp -v mongo-data:/data/db mongo:latest
```
*Note: Alternatively to using Docker locally, you can use [MongoDB Atlas](https://www.mongodb.com/atlas/database) to host your database in the cloud.*

## 17. Configure Database Environment Variables
Add the MongoDB connection string and the application port to your `.env` file:
```env
MONGO_URI=mongodb://admin:strongpassword@localhost:27017
PORT=8000
```

## 18. Configure Database Connection
Create an `index.js` file inside the `./src/db/` directory and implement your MongoDB connection logic there.

## 19. Update the Dev Script
Update the `dev` script in your `package.json` to load environment variables using `dotenv` before starting the application:
```json
"scripts": {
  "dev": "nodemon -r dotenv/config --experimental-json-modules ./src/index.js"
}
```

## 20. Initialize the Application
Import the required modules and start the application server inside `./src/index.js`. You can then start the development server using:

```bash
npm run dev
```

## 21. Create Utility Classes and Functions
Inside the `./src/utils/` directory, create foundational utility files to standardize error handling and API responses across your application:

- **`asyncHandler.js`**: A wrapper function to handle asynchronous Express routes and eliminate repetitive `try-catch` blocks.
- **`ApiError.js`**: A custom error class extending the built-in `Error` to standardize HTTP error responses.
- **`ApiResponse.js`**: A standardized class for formatting successful API responses consistently.

You can create these files using the following command:
```bash
touch ./src/utils/asyncHandler.js ./src/utils/ApiError.js ./src/utils/ApiResponse.js
``` 

## 22. Create Data Models
Define the schemas and models for `User` and `Video` (or any other required entities) inside the `./src/models/` directory using Mongoose. These models will dictate the structure and relationships of your MongoDB collections.

## 23. Install Pagination Plugin
To efficiently manage data like watch history and support scalable data retrieval, install the `mongoose-aggregate-paginate-v2` package:
```bash
npm install mongoose-aggregate-paginate-v2
``` 


## 24. Configure Mongoose Pagination
Apply the `mongoose-aggregate-paginate-v2` plugin to your models (e.g., `video.model.js`) to enable advanced, aggregate-based pagination capabilities:
```javascript
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

videoSchema.plugin(mongooseAggregatePaginate);
```

## 25. Install Password Hashing Library
To securely store passwords, install the `bcrypt` package to hash passwords before persisting them to the database:
```bash
npm install bcrypt
```

## 26. Install JWT for Authentication
Install the `jsonwebtoken` package to robustly manage stateless session authentication using Access and Refresh tokens:
```bash 
npm install jsonwebtoken
```

## 27. Implement Password Hashing Middleware
Utilize a Mongoose `pre("save")` hook in your `User` model to automatically hash the password prior to saving or altering it, intercepting plain-text entries:
```javascript
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
}); 
```

## 28. Implement Password Verification Method
Establish a custom instance method on your `User` model to accurately verify entered passwords against the stored hashed passwords using `bcrypt.compare`:
```javascript
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};
```

## 29. Configure JWT Environment Variables
Integrate the essential token cryptographic secrets and their expiration lifetimes into your `.env` file (be sure to generate robust, randomized strings for production secret keys):
```env
ACCESS_TOKEN_SECRET=your-secure-access-token-secret
ACCESS_TOKEN_EXPIRES_IN=1d
REFRESH_TOKEN_SECRET=your-secure-refresh-token-secret
REFRESH_TOKEN_EXPIRES_IN=10d
```

## 30. Implement Token Generation Logic
Construct synchronous Mongoose methods to explicitly generate standard HTTP Access Tokens (containing identifiable user payload details) and long-lived Refresh Tokens:
```javascript
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName,
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { 
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN 
        }
    );
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        }, 
        process.env.REFRESH_TOKEN_SECRET, 
        { 
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN 
        }
    );
};
```


## 31. Install Cloudinary SDK
To manage and upload media (images, videos), we integrate Cloudinary. First, create a free account on [Cloudinary](https://cloudinary.com/), and then install their Node.js SDK:
```bash
npm install cloudinary 
```
*Note: Depending on project requirements, enterprise alternatives like AWS S3 can also be used directly.*

## 32. Install Multer for File Uploads
Install `multer`, a popular Node.js middleware for handling `multipart/form-data`. It works by temporarily saving the user's uploaded files (like avatars or videos) onto your local server inside `public/temp/` before we pipe them off to Cloudinary:
```bash 
npm install multer
```

## 33. Configure Cloudinary Environment Variables
Append your Cloudinary account credentials to the `.env` file:
```env
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## 34. Create Cloudinary Utility Service
Create `[src/utils/cloudinary.js](src/utils/cloudinary.js)` to encapsulate the file-upload logic. This utility uploads the temporarily saved file to the cloud and meticulously unlinks (deletes) the local cached file to prevent server storage bloat, especially during failed uploads:

```javascript 
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure cloudinary with env credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { 
            resource_type: "auto" // Automatically detect file type (image/video/raw)
        }); 

        console.log("File uploaded to Cloudinary:", response.secure_url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // Delete the local file if upload fails
        console.error("Error uploading to Cloudinary:", error);
        return null;
    }
};

export { uploadOnCloudinary };
```

## 35. Configure Multer Middleware for Local File Uploads
Create a middleware file named `[src/middlewares/multer.middleware.js](src/middlewares/multer.middleware.js)` to handle incoming file uploads using Multer.

We configure Multer specifically to use **DiskStorage** instead of MemoryStorage. This is crucial for production apps handling large media files (like videos), as storing large files in RAM can quickly crash the Node.js server. 

The setup below also demonstrates how to append a unique suffix to filenames (currently commented out but recommended) to gracefully avoid file overwrites if multiple users upload files with identical names:

```javascript
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Save uploaded files temporarily in the local public/temp directory
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        // Optional: Generate a unique suffix to prevent file name collisions
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
        
        // Defaulting to the original file name for now
        cb(null, file.originalname);
    }
});

export const upload = multer({ 
    storage: storage 
});
``` 