import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided or invalid format",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id || decoded._id,
      email: decoded.email,
    };
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: "false",
        message: "Invalid token. Please try again.",
      });
    }
    return res.status(401).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};
export default verifyJWT;