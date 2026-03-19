const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err));

const db = mongoose.connection;

db.on("error", (error) => console.error("Error connecting to database", error));
db.once("open", () => console.log("Connected to database"));

const PORT = process.env.PORT;

app.use(express.json());

const componentsRouter = require("./routes/components");
app.use("/api/components", componentsRouter);
// app.use("/components", componentsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

router.get("/", (req, res) => {
  res.send("Hello World");
});