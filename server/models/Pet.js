const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  name: {
    ua: String,
    en: String
  },
  type: String,
  image: String,
  sex: String,
  age: String,
  size: String,
  breed: String,
  color: String,
  personality: {
    ua: String,
    en: String,
  },
  story: {
    ua: String,
    en: String,
  },
  sterilization: Boolean,
  treatment: Boolean,
});

const PetModel = mongoose.model("pets", PetSchema);
module.exports = PetModel;
