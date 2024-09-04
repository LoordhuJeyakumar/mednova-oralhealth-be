const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateEmail } = require("../utils/helper");
const envProcess = require("../utils/config");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

// Async function to send a verification email to the user
async function sendEmail(doc, emailType) {
  try {
    // Send verification email
    const verificationEmail = await sendVerificationEmail(doc, emailType);
    console.log("Verification email sent successfully");
    return verificationEmail;
  } catch (error) {
    console.log("Error sending verification email");
    console.log(error);
    return error;
  }
}

const userController = {
  signup: async (request, response) => {
    try {
      let { fullName, email, password } = request.body;

      if (!fullName || !email || !password) {
        return response.status(400).json({
          message: "Please provide all required fields",
        });
      }
      fullName = fullName.toUpperCase();
      email = email.toLowerCase();

      if (!validateEmail(email)) {
        return response.status(400).json({
          message: "Please provide a valid email address",
        });
      }

      // Check if a user with the same email already exists

      let existingUser = await UserModel.findOne({ email });

      // Handle existing user scenarios
      if (existingUser) {
        return response.status(409).json({
          message: existingUser.verification
            ? `User with '${email}' already exists`
            : `User with '${email}' already exists, Please verify your email to activate`,
        });
      }

      let hashPassword = await bcrypt.hash(password, 10);

      // Create a JWT verification token with user information
      const verificationToken = jwt.sign(
        {
          fullName,
          email,
        },
        envProcess.JWT_SECRET,
        { expiresIn: "24h" }
      );

      const newUser = await UserModel.create({
        fullName,
        email,
        password: hashPassword,
        verificationToken,
      });
      if (newUser) {
        response.status(201).json({
          message: "User created successfully, Please verify your email! ",
          data: {
            fullName: newUser.fullName,
            email: newUser.email,
            id: newUser._id,
            role: newUser.role,
            verification: newUser.verification,
          },
        });
      }

      // Attempt to send verification email using the sendEmail function
      /* 
        Note that the sendEmail function is called after the user document has been saved, and the response is sent before the email is sent. This ensures that the response is returned immediately, while the email sending process runs in the background.
        */
      let emailInfo = await sendEmail(newUser, "activationEmail");
      if (!emailInfo) {
        console.error("Error sending verification email");
      }

      return;
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  login: async (request, response) => {
    try {
      let { email, password } = request.body;
      if (!email || !password) {
        return response.status(400).json({
          message: "Please provide all required fields",
        });
      }
      email = email.toLowerCase();
      const existUser = await UserModel.findOne({ email });
      if (!existUser) {
        return response.status(404).json({
          message: `User with '${email}' not found`,
        });
      }

      if (!existUser.verification) {
        return response.status(401).json({
          message: "Please verify your email to login",
        });
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        existUser.password
      );
      if (!isPasswordMatch) {
        return response.status(401).json({
          message: "Invalid password",
        });
      }
      const token = jwt.sign(
        { userId: existUser._id, email: existUser.email },
        envProcess.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return response.status(200).json({
        message: "User logged in successfully",
        token,
        user: {
          fullName: existUser.fullName,
          email: existUser.email,
          id: existUser._id,
          role: existUser.role,
          verification: existUser.verification,
        },
      });
    } catch (error) {
      return response.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  getUser: async (request, response) => {
    try {
      const userId = request.userId;
      const user = await UserModel.findById(userId, {
        password: 0,
        verificationToken: 0,
      });
      if (!user) {
        return response.status(404).json({
          message: "User not found",
        });
      }
      return response.status(200).json({
        message: "User fetched successfully",
        data: user,
      });
    } catch (error) {
      return response.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  updateUser: async (request, response) => {
    try {
      const userId = request.userId;
      const { fullName, email } = request.body;
      const existUser = await UserModel.findById(userId);
      if (!existUser) {
        return response.status(404).json({
          message: "User not found",
        });
      }
      existUser.fullName = fullName || existUser.fullName;
      existUser.email = email || existUser.email;

      if (existUser.email != email) {
        existUser.verification = false;
      }

      const user = await existUser.save();

      return response.status(200).json({
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      return response.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  deleteUser: async (request, response) => {
    try {
      const userId = request.userId;
      const user = await UserModel.findByIdAndDelete(userId);
      if (!user) {
        return response.status(404).json({
          message: "User not found",
        });
      }
      return response.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      return response.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  verifyActivationToken: async (request, response) => {
    try {
      const { userId, verifyToken } = request.params;

      if (!userId || !verifyToken) {
        return response.status(400).json({
          message: "Verification token and userId required",
        });
      }

      // Verify the token
      let decoded;
      try {
        decoded = jwt.verify(verifyToken, envProcess.JWT_SECRET);
      } catch (err) {
        console.log(err);
        if (err.fullName === "TokenExpiredError") {
          return response.status(401).json({
            message: "Token expired",
          });
        }

        return response.status(401).json({
          message: "Invalid or expired verification token",
        });
      }

      // Find the user by ID and token
      const user = await UserModel.findOne({
        _id: userId,
      });
      if (!user) {
        return response.status(404).json({
          message: "User not found",
        });
      }
      // Check if the user is already verified
      if (user.verification) {
        return response.status(200).json({
          message: "User is already verified",
        });
      }

      // Mark user as verified and clear the verification token
      user.verification = true;
      user.verificationToken = null; // Clear the token
      await user.save();

      return response.status(200).json({
        message: "User verified successfully",
      });
    } catch (error) {
      return response.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

module.exports = userController;
