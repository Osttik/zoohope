const mongoose = require('mongoose');

const HelpOptionsSchema = new mongoose.Schema({
    name: String,
    description: String
});

const HelpOptionsModel = mongoose.model('help-options', HelpOptionsSchema);
module.exports = HelpOptionsModel