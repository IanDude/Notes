import mongoose from "mongoose";

//Step 1 - Create a Schema (JSON)
//Step 2 - Create a model based off of the schema

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // imageUrl: {
    //   type: String,
    //   default: null,
    // },
  },
  { timestamps: true },
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
