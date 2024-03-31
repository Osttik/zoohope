const mongoose = require('mongoose');

const HelpOptionsSchema = new mongoose.Schema({
    name: {
        en: String,
        ua: String
    },
    description: String
});

const HelpOptionsModel = mongoose.model('help-options', HelpOptionsSchema);
module.exports = HelpOptionsModel