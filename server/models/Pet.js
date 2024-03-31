const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  name: {
    en: String,
    ua: String
  },
  type: String,
  image: String,
  sex: String,
  age: Number,
  size: String,
  breed: String,
  color: String,
  sterilization: Boolean,
  treatment: Boolean,
  personality: {
    en: String,
    ua: String
  },
  story: {
    en: String,
    ua: String
  },
});

const PetModel = mongoose.model("pets", PetSchema);
module.exports = PetModel;
