const questionRouter = require("./questionRouter");
const userResponseRouter = require("./userResponseRouter");
const userRouter = require("./userRoutes");

const appRouter = require("express").Router();

//Routes for user and auth
appRouter.use("/user", userRouter);
appRouter.use("/question", questionRouter);
appRouter.use("/user-response", userResponseRouter);

module.exports = appRouter;
