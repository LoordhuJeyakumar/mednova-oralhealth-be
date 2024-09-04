const jwt = require("jsonwebtoken");
const envProcess = require("../utils/config");

const getTokenFromRequest = (request) => {
  const { authorization } = request.headers;
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const authMiddleware = async (request, response, next) => {
  const token = getTokenFromRequest(request);
  if (!token) {
    return response.status(401).json({ message: "Token not found" });
  }

  try {
    const decodedToken = jwt.verify(token, envProcess.JWT_SECRET);
    request.userId = decodedToken.userId;
    request.user = decodedToken;
    next();
  } catch (error) {
    console.error(error);

    if (error.name === "JsonWebTokenError") {
      return response.status(401).json({ message: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return response.status(401).json({ message: "Token has expired" });
    }

    return response.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  authMiddleware,
  getTokenFromRequest,
};
