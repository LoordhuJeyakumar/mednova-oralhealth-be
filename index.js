// Import Mongoose for interacting with MongoDB
const mongoose = require("mongoose");
// Import the environment variables and configuration settings
const envProcess = require("./utils/config");
// Import the Express.js application instance
const app = require("./app");

const PORT = envProcess.PORT || 3000;

let retryCount = 0;

async function connectToMongoDB() {
  try {
    // Ensure any previous connections are closed
    await mongoose.disconnect();
    // Connecting to the MongoDB database using Mongoose
    // Using the MongoDB URI and database name from the environment configuration
    await mongoose.connect(
      `${envProcess.MONGODB_CONNECTION_URI}${envProcess.MONGO_DB_NAME}`
    );
    // If the connection is successful, log the success message
    console.log("Successfully connected to MongoDB");

    // Start the Express server on the specified port
    // Log a message indicating the server is running
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    // Log an error message if the connection fails, including the error details
    console.log("Error connecting to MongoDB", error.message);
    //Retry to connect the db maximum 3 times
    if (retryCount < 3) {
      retryCount++;
      console.log("Retrying after 5 seconds...");
      setTimeout(connectToMongoDB, 5000);
    } else {
      console.log("Maximum retry attempts reached. Exiting...");
      process.exit(1);
    }
  }
}

// Log a message indicating the start of the database connection process
console.log("Connecting to the database.... ");
connectToMongoDB(); // Call the function to initiate the connection
