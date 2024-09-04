const mongoose = require("mongoose");
// Importing the validateEmail function from helper.js
const { validateEmail } = require("../utils/helper");

// Defining the schema for the User model
const userSchema = new mongoose.Schema(
  {
    // Name of the user, required field
    fullName: { type: String, required: [true, "Full name is requierd"] },
    // Email of the user, required and must be unique
    email: {
      type: String,
      required: [true, "Email is requierd"],
      unique: true,
      validate: {
        validator: validateEmail, // Custom validator function to check email format
        message: "Please enter a valid email address",
      },
    },
    // Password of the user, required field
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // Role of the user, either 'user' or 'admin'
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // Indicates if the user's email has been verified
    verification: { type: Boolean, default: false },
    // Token used for email verification
    verificationToken: { type: String, default: "" },
  },
  { timestamps: true } // Automatically add `createdAt` and `updatedAt` timestamps
);

// Creating the User model from the schema and specifying the collection name
const UserModel = mongoose.model("User", userSchema, "users");

// Exporting the User model for use in other parts of the application
module.exports = UserModel;
