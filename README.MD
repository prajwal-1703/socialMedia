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

## 8. Add Scripts
Add a `dev` script to your `package.json` to run your server via `nodemon`:
```json
"scripts": {
  "dev": "nodemon ./src/index.js"
}
```

## 9. Create the Source Directory
Create the main source directory:
```bash
mkdir src
```

## 10. Create Core Files
Using your terminal or code editor, navigate down to the `src` folder and create your initial application files:
```bash
touch ./src/app.js ./src/constants.js ./src/index.js
```

## 11. Create the Project Sub-directories
Inside the `./src` directory, create folders to organize the architecture of your application:
```bash
cd src
mkdir controllers db middlewares models routes utils
```

## 12. Setup Prettier (Recommended)
Install `prettier` as a development dependency to ensure consistent code formatting across the project:
```bash
npm install --save-dev prettier
# or
npm i -D prettier
```

## 13. Configure Prettier Formatting
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

## 14. Configure Prettier Ignore
To prevent Prettier from incorrectly formatting certain generated configuration files, add a `.prettierignore` file with the following contents:
```plaintext
/.vscode
/node_modules
/dist
*.env
.env
.env.*
```