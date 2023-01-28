const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST, DB_NAME, PORT = 4000 } = process.env;

// const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: DB_NAME,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log("Server running on port", PORT);
    })
  )
  .catch((error) => {
    console.log(`Database not connection. ${error.message}`);
    process.exit(1);
  });
