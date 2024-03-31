const mongoose = require('mongoose');
const PetModel = require('../models/Pet'); 

require("dotenv").config();
const databaseUrl = process.env.DATABASE_URL;
mongoose.connect(databaseUrl)
.then(() => {
  console.log("Connected to MongoDB");
});

module.exports = async function migrateData() {
    const documents = await PetModel.find({'story.en': { $exists: false }});

    for (let doc of documents) {
        const newStory = {
            en: JSON.parse(JSON.stringify(doc.story)),
            ua: ""
        }

        doc.story = newStory;
        await doc.save();
    }

    console.log('Migration completed successfully.');
}