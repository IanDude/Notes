import { Register, Login, getCurrentUser, refreshAccessToken, Logout } from "../controllers/authController.js";
import express from "express";
import verifyJWT from "../middleware/auth.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/me", verifyJWT, getCurrentUser);
router.post("/refresh", refreshAccessToken);

export default router;
