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

app.get("/getFilteredPets", (req, res) => {
  if (Pet.find()) {
    Pet.find()
      .select({ name: 1, image: 1, age: 1, sex: 1, type: 1 })
      .then((result) => {
        let filteredArray = result;

        if (req.query.type) {
          filteredArray = filteredArray.filter((el) => el.type === req.query.type);
        }
        if (req.query.sex) {
          filteredArray = filteredArray.filter((el) => el.sex === req.query.sex);
        }
        if (req.query.maxAge) {
          filteredArray = filteredArray.filter((el) => el.age <= Number(req.query.maxAge));
        }
        if (req.query.minAge) {
          filteredArray = filteredArray.filter((el) => el.age >= Number(req.query.minAge));
        }

        let pageSize = 12;
        let startIndex = (Number(req.query.page) - 1) * pageSize;
        let endIndex = startIndex + pageSize;

        let pageApplied = filteredArray.reverse().slice(startIndex, endIndex);

        res.json({ array: pageApplied, pages: Math.ceil(filteredArray.length / pageSize), length: result.length });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send([]);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
