import mongoose from "mongoose";

export const connection = () =>
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database Conecnted"))
    .catch((err) => console.log(err));
