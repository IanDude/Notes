import User from "../models/User.js";
import jwt from "jsonwebtoken";
export async function Register(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function Login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const valid = await user.comparePassword(password);
    if (!valid) return res.status(401).json({ message: "Invalid Credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
}
