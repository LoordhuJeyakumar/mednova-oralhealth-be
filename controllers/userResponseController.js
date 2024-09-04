const UserResponseModel = require("../models/userResponseModel");
const QuestionModel = require("../models/questionModel");

const userResponseController = {
  submitAnswer: async (req, res) => {
    /*  try {
      const { questionId, selectedOption } = req.body;

      const userId = req.userId;
      // Validate the input
      if (!userId || !questionId || !selectedOption) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Verify if the question exists
      const question = await QuestionModel.findById(questionId);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      // Validate the answer by checking if the selectedOption matches any option in the question
      const validOption = question.options.find(
        (option) => option.value === selectedOption.value
      );

      if (!validOption) {
        return res.status(400).json({ message: "Invalid answer" });
      }

      // Check if the user has already submitted an answer for this question
      let userResponse = await UserResponseModel.findOne({
        userId,
        questionId,
      });
      if (userResponse) {
        // Update the existing response
        userResponse.answers.push(selectedOption);
        userResponse = await userResponse.save();
      } else {
        // Create a new response
        userResponse = await UserResponseModel.create({
          userId,
          questionId,
          selectedOption,
        });
      }

      res.status(200).json({
        message: "Answer submitted successfully",
        userResponse,
      });
    } catch (error) {
      console.error("Error submitting answer:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    } */

    try {
      const { questionId, selectedOption } = req.body;
      const userId = req.userId;

      // Validate the input
      if (!userId || !questionId || !selectedOption) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Verify if the question exists
      const question = await QuestionModel.findById(questionId);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      // Validate the answer by checking if the selectedOption matches any option in the question
      const validOption = question.options.find(
        (option) => option.optionValue === selectedOption.optionValue
      );

  

      if (!validOption) {
        return res.status(400).json({ message: "Invalid answer" });
      }

      // Check if the user has already submitted an answer for this question
      let userResponse = await UserResponseModel.findOne({
        userId,
        "answers.questionId": questionId,
      });

      if (userResponse) {
        // Update the existing response for the question
        userResponse.answers = userResponse.answers.map((answer) =>
          answer.questionId.toString() === questionId
            ? {
                ...answer,
                selectedOption: selectedOption.value,
                score: validOption.score,
              }
            : answer
        );
      } else {
        // Create a new response or update the existing response by adding a new answer
        userResponse = await UserResponseModel.findOneAndUpdate(
          { userId },
          {
            $push: {
              answers: {
                questionId,
                selectedOption: selectedOption.value,
                score: validOption.score,
              },
            },
          },
          { new: true, upsert: true }
        );
      }

      // Save the updated or new user response
      userResponse = await userResponse.save();

      // Fetch total questions
      const totalQuestions = await QuestionModel.countDocuments();

      // Fetch total answered questions
      const totalAnsweredQuestions = userResponse.answers.length;

      // Calculate pending questions
      const pendingQuestions = totalQuestions - totalAnsweredQuestions;

      // Calculate the total score if all questions are answered
      let totalScore = null;
      if (pendingQuestions === 0) {
        totalScore = userResponse.answers.reduce(
          (sum, answer) => sum + answer.score,
          0
        );
        userResponse.totalScore = totalScore;
        await userResponse.save();
      }

      res.status(200).json({
        message: "Answer submitted successfully",
        totalQuestions,
        totalAnsweredQuestions,
        pendingQuestions,
        totalScore,
        userResponse,
      });
    } catch (error) {
      console.error("Error submitting answer:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getUserResponses: async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const userResponses = await UserResponseModel.find({ userId });

      if (!userResponses.length) {
        return res
          .status(404)
          .json({ message: "No responses found for this user" });
      }

      res.status(200).json({
        message: "User responses fetched successfully",
        userResponses,
      });
    } catch (error) {
      console.error("Error fetching user responses:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getResponseForQuestion: async (req, res) => {
    try {
      const { userId, questionId } = req.params;

      if (!userId || !questionId) {
        return res
          .status(400)
          .json({ message: "User ID and Question ID are required" });
      }

      const userResponse = await UserResponseModel.findOne({
        userId,
        questionId,
      });

      if (!userResponse) {
        return res
          .status(404)
          .json({ message: "Response not found for this question" });
      }

      res.status(200).json({
        message: "User response fetched successfully",
        userResponse,
      });
    } catch (error) {
      console.error("Error fetching user response:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

module.exports = userResponseController;
