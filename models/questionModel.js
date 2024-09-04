const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const questionSchema = new mongoose.Schema(
  {
    questionText: { type: String, required: true },
    options: [
      {
        optionText: { type: String, required: true },
        //Unique
        optionValue: {
          type: String,
          required: true,
          unique: true,
          default: () => uuidv4(),
        },
        score: { type: Number, required: true }, // Score for this option
      },
    ],
    score: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const QuestionModel = mongoose.model("Question", questionSchema, "questions");

module.exports = QuestionModel;
