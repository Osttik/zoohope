const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: String,
    image: String, 
    sex: String,
    age: String, 
    size: String,
    breed: String,
    color: String, 
    personality: String,
    story: String
});

const PetModel = mongoose.model('pets', PetSchema);
module.exports = PetModel