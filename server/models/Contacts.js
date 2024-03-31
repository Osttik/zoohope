const mongoose = require('mongoose');

const ContactsSchema = new mongoose.Schema({
    name: {
        en: String,
        ua: String
    },
    url: String,
    icon: String
});

const ContactsModel = mongoose.model('contacts', ContactsSchema);
module.exports = ContactsModel