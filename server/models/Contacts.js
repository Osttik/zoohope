const mongoose = require('mongoose');

const ContactsSchema = new mongoose.Schema({
    name: String,
    url: String,
    icon: String
});

const ContactsModel = mongoose.model('contacts', ContactsSchema);
module.exports = ContactsModel