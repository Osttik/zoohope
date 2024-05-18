const mongoose = require('mongoose');

const HelpfulInfoSchema = new mongoose.Schema({
    question: {
        en: String,
        ua: String
    },
    information: {
        en: String,
        ua: String
    }
});

const HelpfulInfoModel = mongoose.model('helpful-info', HelpfulInfoSchema);
module.exports = HelpfulInfoModel