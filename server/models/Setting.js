const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema({
   key: String,
   value: String
});

const SettingModel = mongoose.model("setting", SettingSchema);
module.exports = SettingModel;
