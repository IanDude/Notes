import express from "express";
import {
  createNote,
  deleteNote,
  getNoteById,
  getAllNotes,
  updateNote,
} from "../controllers/notesController.js";
import verifyJWT from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
