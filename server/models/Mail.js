const mongoose = require("mongoose");

const MailSchema = new mongoose.Schema({
  email: String,
  msg: String,
  firstName: String,
  lastName: String,
  phone: Number,
});

const MailModel = mongoose.model("mail", MailSchema);
module.exports = MailModel;
