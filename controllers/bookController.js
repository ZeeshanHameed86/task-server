import Book from "../models/bookModel.js";

export const addBook = async (req, res, next) => {
  try {
    const {
      title,
      authorName,
      publicationHouse,
      publicationDate,
      genre,
      publicationYear,
    } = req.body;

    const userId = req.user._id;

    const book = await Book.create({
      title,
      authorName,
      publicationHouse,
      publicationDate,
      genre,
      publicationYear,
      userId,
    });

    res.status(201).json({ success: true, message: "Successfully Added" });
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find({ userId: req.user._id });

    res.status(200).json({ success: true, books });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { category, id } = req.body;
    await Book.findOneAndUpdate({ _id: id }, { category });

    res.status(200).json({ success: true, messsage: "Updated Successfully" });
  } catch (error) {
    next(error);
  }
};
