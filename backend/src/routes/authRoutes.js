import { Register, Login, getCurrentUser } from "../controllers/authController.js";
import express from "express";
import verifyJWT from "../middleware/auth.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/me", verifyJWT, getCurrentUser);

export default router;
