const mongoose = require('mongoose');

const HelpOptionsSchema = new mongoose.Schema({
    name: {
        type: {
            en: String,
            ua: String
        },
        required: false,
        default: undefined
    },
    description: {
        en: String,
        ua: String
    }
});

const HelpOptionsModel = mongoose.model('help-options', HelpOptionsSchema);
module.exports = HelpOptionsModel