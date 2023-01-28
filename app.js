const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

// const noticeRouter = require("./api/noticeRouter");
const authRouter = require("./routes/api/authRouter");
// const serviceRouter = require("./api/serviceRouter");
const userRouter = require("./routes/api/userRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.json());
app.use(cors());
app.use(logger(formatsLogger));
app.use(express.static("public"));

app.use("/api/auth", authRouter);
// app.use("/api", serviceRouter);
app.use("/api/users", userRouter);
// app.use("/api/notices", noticeRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
