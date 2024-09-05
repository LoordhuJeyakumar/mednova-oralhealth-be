const questionController = require("../controllers/questionController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const questionRouter = require("express").Router();

questionRouter.post(
  "/create",
  authMiddleware,
  questionController.createQuestion
);
questionRouter.get("/all", authMiddleware, questionController.getAllQuestions);
questionRouter.get("/:id", authMiddleware, questionController.getQuestionById);
questionRouter.put("/:id", authMiddleware, questionController.updateQuestion);
questionRouter.delete(
  "/:id",
  authMiddleware,
  questionController.deleteQuestion
);


module.exports = questionRouter;
