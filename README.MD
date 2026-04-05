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
Import the required modules and start the application server inside `./src/index.js`.