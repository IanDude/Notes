import Note from "../models/Note.js";
export async function getAllNotes(_, res) {
  // res.status(200).send("Notes fetched successfully!");
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error fetching Notes: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  // res.status(200).json({ message: "Note Updated successfully!" });
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ newNote });
  } catch (error) {
    console.error("Error in createNote controller".error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  // res.status(200).json({ message: "Note updated successfully!" });
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!updatedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  // res.status(200).json({ message: "Note delete successfully!" });
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Deleted Note", deletedNote });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error("Error in deletNote controller: ", error);
  }
}
