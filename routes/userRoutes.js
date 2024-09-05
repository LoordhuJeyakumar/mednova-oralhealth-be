const userRouter = require("express").Router();
const userController = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");

// Route for user signup
userRouter.post("/signup", userController.signup);

// Route for user login
userRouter.post("/login", userController.login);

// Route for getting user profile
userRouter.get("/profile",authMiddleware, userController.getUser);

//Route for updating user profile
userRouter.put("/update", authMiddleware, userController.updateUser);

//Route for deleting user profile
userRouter.delete("/delete", authMiddleware, userController.deleteUser);

//Route for verifying user token
userRouter.get(
  "/verify/:userId/:verifyToken",
  userController.verifyActivationToken
);

//Route for check is accestoken valid or not for protected route
userRouter.get("/protected-route", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route" });
});

module.exports = userRouter;
