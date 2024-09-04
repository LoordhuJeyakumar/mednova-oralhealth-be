const QuestionModel = require("../models/questionModel");

const questionController = {
  createQuestion: async (req, res) => {
    try {
      const { questionText, options } = req.body;

      if (
        !questionText ||
        !options ||
        !Array.isArray(options) ||
        options.length < 2
      ) {
        return res.status(400).json({ message: "Invalid question data" });
      }

      const newQuestion = await QuestionModel.create({
        questionText,
        options,
      });

      res.status(201).json({
        message: "Question created successfully",
        question: newQuestion,
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ message: "Error creating question", error: error.message });
    }
  },

  getAllQuestions: async (req, res) => {
    try {
      const questions = await QuestionModel.find();

      res.status(200).json({ questions });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ message: "Error fetching questions", error: error.message });
    }
  },

  getQuestionById: async (req, res) => {
    try {
      const { questionId } = req.params;

      const question = await QuestionModel.findById(questionId);

      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      res.status(200).json({ question });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ message: "Error fetching question", error: error.message });
    }
  },

  updateQuestion: async (req, res) => {
    try {
      const { questionId } = req.params;
      const { questionText, options } = req.body;

      const updatedQuestion = await QuestionModel.findByIdAndUpdate(
        questionId,
        { questionText, options },
        { new: true }
      );

      if (!updatedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }

      res.status(200).json({
        message: "Question updated successfully",
        question: updatedQuestion,
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ message: "Error updating question", error: error.message });
    }
  },

  deleteQuestion: async (req, res) => {
    try {
      const { questionId } = req.params;

      const deletedQuestion = await QuestionModel.findByIdAndDelete(questionId);

      if (!deletedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }

      res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ message: "Error deleting question", error: error.message });
    }
  },
};

module.exports = questionController;
