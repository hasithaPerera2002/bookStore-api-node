require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const books = require("./routes/bookRouter");
const admin = require("./routes/userRouter");
const CustomError = require("./util/customError");
const MongoStore = require("connect-mongo");
const globalErrorHandler = require("./controller/errorController");
const category = require("./routes/categoryRoute");
//const notFound = require("./middleware/notFound");
const app = express();
const session = require("express-session");
const passport = require("passport");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
  });
});

app.use(express.json());
app.use("/api/v1/books", books);
app.use("/api/v1", admin);
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1/category", category);
app.all("*", (req, res, next) => {
  next(new CustomError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
