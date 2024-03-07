const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Pet = require("./models/Pet");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/zoonadiya")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
