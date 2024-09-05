const userResponseController = require("../controllers/userResponseController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const userResponseRouter = require("express").Router();

userResponseRouter.get(
  "/all/:userId",
  authMiddleware,
  userResponseController.getUserResponses
);
userResponseRouter.post(
  "/submit",
  authMiddleware,
  userResponseController.submitAnswer
);
userResponseRouter.get(
  "/get",
  authMiddleware,
  userResponseController.getResponseForQuestion
);

userResponseRouter.get(
  "/stats",
  authMiddleware,
  userResponseController.getUserStats
);

module.exports = userResponseRouter;
