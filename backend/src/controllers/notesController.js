import Note from "../models/Note.js";
export async function getAllNotes(req, res) {
  // res.status(200).send("Notes fetched successfully!");
  try {
    console.log("User token from: ", req.user);

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const notes = await Note.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    console.log("Error fetching Notes: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // Check if the note belongs to the authenticated user
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this note",
      });
    }

    res.json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function createNote(req, res) {
  // res.status(200).json({ message: "Note Updated successfully!" });
  try {
    const { title, content } = req.body;
    const newNote = await Note.create({
      user: req.user.id,
      title,
      content,
    });
    res.status(201).json({ success: true, data: newNote });
  } catch (error) {
    console.error("Error in createNote controller".error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  // res.status(200).json({ message: "Note updated successfully!" });
  try {
    const { title, content } = req.body;
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to updated this role.",
      });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    const updatedNote = await note.save();
    res.status(200).json({
      success: true,
      data: updatedNote,
    });
  } catch (error) {
    console.error("Error in updateNote controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  // res.status(200).json({ message: "Note delete successfully!" });
  try {
    const note = await Note.findById(req.params.id);
    if (!note)
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this note",
      });
    }
    await note.deleteOne();
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    console.error("Error in deletNote controller: ", error);
  }
}
