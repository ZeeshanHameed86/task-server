import ErrorHandler from "../middlewares/error.js";
import User from "../models/userModel.js";
import Book from "../models/bookModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, message: "Successfully Registered" });
  } catch (error) {
    if (error.code === 11000) {
      next(new ErrorHandler("email already exists", 400));
    } else {
      next(error);
    }
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let isMatched;

  const user = await User.findOne({ email }).select("+password");
  if (user) {
    isMatched = await bcrypt.compare(password, user.password);
  }

  if (!user || !isMatched) {
    return next(new ErrorHandler("email or password is incorrect", 401));
  }

  const userData = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: new Date(new Date().setDate(new Date().getDate() + 1)),
    })
    .json({
      success: true,
      user: userData,
      token,
      message: "Logged In Successfully",
    });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: new Date(0),
    })
    .json({ success: true, message: "Successfully Logged Out" });
};

export const deleteAccount = async (req, res) => {
  await User.deleteOne({ _id: req.user._id });
  await Book.deleteMany({ userId: req.user._id });
};
