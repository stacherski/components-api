require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const apiKey = require("./middleware/apiKey");
const app = express();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err));

const db = mongoose.connection;

db.on("error", (error) => console.error("Error connecting to database", error));
db.once("open", () => console.log("Connected to database"));

const PORT = process.env.PORT;

app.use(apiKey).set("x-api-key", process.env.API_KEY);

app.use(express.json());

const componentsRouter = require("./routes/components");
app.use("/api/components", componentsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
