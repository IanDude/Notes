import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ message: "No token" });
  const token = authHeader.split(" ", [1]);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyJWT;
