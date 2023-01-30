const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

require("dotenv").config();

const noticeRouter = require("./routes/api/noticeRouter");
const authRouter = require("./routes/api/authRouter");
const serviceRouter = require("./routes/api/serviceRouter");
const userRouter = require("./routes/api/userRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(cors());
app.use(logger(formatsLogger));
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api", serviceRouter);
app.use("/api/users", userRouter);
app.use("/api/notices", noticeRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
