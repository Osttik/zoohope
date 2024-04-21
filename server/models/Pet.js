const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  name: {
    en: String,
    ua: String
  },
  type: String,
  images: [String],
  sex: String,
  age: Number,
  size: String,
  breed: {
    en: String,
    ua: String
  },
  color: {
    en: String,
    ua: String
  },
  personality: {
    en: String,
    ua: String
  },
  story: {
    en: String,
    ua: String
  },
  sterilization: String,
  treatment: String
});

const PetModel = mongoose.model("pets", PetSchema);
module.exports = PetModel;
