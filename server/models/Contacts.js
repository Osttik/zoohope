const mongoose = require('mongoose');

const ContactsSchema = new mongoose.Schema({
    name: {
        en: String,
        ua: String
    },
    url: String,
    icon: String,
    value: String
});

const ContactsModel = mongoose.model('contacts', ContactsSchema);
module.exports = ContactsModel