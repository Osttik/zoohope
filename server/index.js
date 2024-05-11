require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./navigation/main");
const swagger = require('./swagger');
const {auth_router} = require('./auth/auth');

const app = express();
const port = process.env.PORT || 5000;
const databaseUrl = process.env.DATABASE_URL;


app.use(express.json());
app.use(cors());
app.use(auth_router);
app.use(router);
app.use(express.static('uploads'));
swagger(app, router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});


mongoose
.connect(databaseUrl)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.error("Failed to connect to MongoDB:", error);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
