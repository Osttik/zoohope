const HelpOptionsModel = require('../../models/HelpOption');

//add help options
module.exports.addHelpOptions = async (req, res) => {
    try {
        const newHelpOption = new HelpOptionsModel(req.body);
        const savedHelpOption = await newHelpOption.save();

        res.status(201).json(savedHelpOption);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get all help options
module.exports.getAllHelpOptions = async (req, res) => {
    try {
        const helpOptions = await HelpOptionsModel.find();

        res.json(helpOptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//update help options
module.exports.updateHelpOption = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedHelpOption = await HelpOptionsModel.findByIdAndUpdate(id, req.body, { new: true });

        res.json(updatedHelpOption);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete help options
module.exports.deleteHelpOption = async (req, res) => {
    try {
        const { id } = req.params;

        await HelpOptionsModel.findByIdAndDelete(id);

        res.json({ message: 'Help option was deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};