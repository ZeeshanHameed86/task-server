import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    publicationHouse: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    genre: { type: String, required: true },
    publicationYear: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "plan-to-read",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("book", bookSchema);

export default Book;
