const questionController = require("../controllers/questionController");

const questionRouter = require("express").Router();

questionRouter.post("/create", questionController.createQuestion);
questionRouter.get("/all", questionController.getAllQuestions);
questionRouter.get("/:id", questionController.getQuestionById);
questionRouter.put("/:id", questionController.updateQuestion);
questionRouter.delete("/:id", questionController.deleteQuestion);


module.exports = questionRouter;
