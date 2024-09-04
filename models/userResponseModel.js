const mongoose = require("mongoose");
const userResponseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        selectedOption: { type: String, required: true }, // Text of the selected option
        score: { type: Number, required: true }, // Score for the selected option
      },
    ],
    totalScore: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const UserResponseModel = mongoose.model("Response", userResponseSchema);

module.exports = UserResponseModel;
