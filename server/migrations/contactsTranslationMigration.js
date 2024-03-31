const mongoose = require("mongoose");
const contactModel = require("../models/Contacts");

require("dotenv").config();
const databaseUrl = process.env.DATABASE_URL;
mongoose.connect(databaseUrl).then(() => {
  console.log("Connected to MongoDB");
});

module.exports = async function migrateData() {
  const documents = await contactModel.find({
    "name.en": { $exists: false },
  });

  for (let doc of documents) {
    const newName = {
      en: JSON.parse(JSON.stringify(doc.name)),
      ua: "",
    };

    doc.name = newName;
    await doc.save();
  }

  console.log("Migration completed successfully.");
};