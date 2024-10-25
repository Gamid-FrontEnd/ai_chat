This project is a React application. Follow the instructions below to set up and run the app locally.

## Prerequisites

- Make sure you have **Node.js** and **npm** installed on your machine.
- If you don't have Node.js, download and install it from [Node.js](https://nodejs.org/).

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Gamid-FrontEnd/ai_chat.git
```

### 2. Navigate to the project directory

```bash
cd ai_chat
```

### 3. Install dependencies
Run the following command to install all necessary node modules:

```bash
npm install
```

This will create a node_modules folder and install all dependencies specified in the package.json file.

### 4. Set up Firebase configuration
  4.1 Go to your Firebase Console and create a Firebase project if you haven't already.
  4.2 Find your Firebase configuration by going to Project Settings > General > Your apps and clicking Config under Firebase SDK snippet.
  4.3 Copy the Firebase config object and paste it into your App.tsx file.

  ```typescript
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID",
  };
  ```

### 5. Start the development server

```bash
npm start
```
