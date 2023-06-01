import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import ErrorHandler from "./error.js";

export const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new ErrorHandler("You are not authorized to access this feature", 401)
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return next(
      new ErrorHandler("You are not authorized to access this feature", 401)
    );
  }

  const user = await User.findOne({ _id: decoded.id });

  req.user = user;

  next();
};
