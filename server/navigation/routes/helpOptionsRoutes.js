const HelpOptionsModel = require('../../models/HelpOption');

//add help options
module.exports.addHelpOptions = async (req, res) => {
    try {
        const newHelpOption = new HelpOptionsModel(req.body);
        let err = newHelpOption.validateSync()
        if (err) {
            res.status(400).json({message: err.message})
        } else {
            try {
                const savedHelpOption = await newHelpOption.save();
                res.status(201).json(savedHelpOption);
            } catch (err) {
                res.status(500).json({message: err.message});
            }
        }
    } catch (err) {
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

module.exports.getHelpOptionById = async (req, res) => {
    try {
        const { id } = req.params;

        const helpOption = await HelpOptionsModel.findById(id);

        if (!helpOption) {
            return res.status(404).json({ message: 'can not find this help option' });
        }

        res.json(helpOption);
    } catch (error) {
        console.error('Error getting help option by id', error);
        res.status(500).json({ message: error.message });
    }
};

//update help options
module.exports.updateHelpOption = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedHelpOption = await HelpOptionsModel.findByIdAndUpdate(id, req.body, { new: true });
        if(!updatedHelpOption) {
            return res.status(404).json({ message: 'No HelpOption in database' });
        }
        let err = updatedHelpOption.validateSync()
        if (err) {
            res.status(400).json({message: err.message})
        } else {
            res.json(updatedHelpOption);
        }
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
};

//delete help options
module.exports.deleteHelpOption = async (req, res) => {
    try {
        const { id } = req.params;

        let helpOption = await HelpOptionsModel.findByIdAndDelete(id);

        res.json(helpOption);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};