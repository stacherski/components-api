const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on("error", (error) => console.error("Error connecting to database", error));
db.once("open", () => console.log("Connected to database"));

const PORT = process.env.PORT;

app.use(express.json());

const componentsRouter = require("./routes/components");
app.use("/components", componentsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send(JSON.stringify({ hello: "world" }));
});
