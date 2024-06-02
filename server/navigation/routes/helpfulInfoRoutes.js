const HelpfulInfoModel = require('../../models/HelpfulInfo');

module.exports.addHelpfulInfo = async (req, res) => {
    try {
        const newHelpfulInfo = new HelpfulInfoModel(req.body);
        let err = newHelpfulInfo.validateSync()
        if (err) {
            res.status(400).json({message: err.message})
        } else {
            try {
                const savedHelpfulInfo = await newHelpfulInfo.save();
                res.status(201).json(savedHelpfulInfo);
            } catch (err) {
                res.status(500).json({message: err.message});
            }
        }
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getAllHelpfulInfo = async (req, res) => {
    try {
        const helpfulInfo = await HelpfulInfoModel.find();
        
        res.json(helpfulInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getHelpfulInfoById = async (req, res) => {
    try {
        const { id } = req.params;

        const helpfulInfo = await HelpfulInfoModel.findById(id);

        if (!helpfulInfo) {
            return res.status(404).json({ message: 'can not find this helpful info' });
        }

        res.json(helpfulInfo);
    } catch (error) {
        console.error('Error getting helpful info by id', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateHelpfulInfo = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedHelpfulInfo = await HelpfulInfoModel.findByIdAndUpdate(id, req.body, { new: true });

        if(!updatedHelpfulInfo) {
            return res.status(404).json({ message: 'No helpful info in database' });
        }
        let err = updatedHelpfulInfo.validateSync()
        if (err) {
            res.status(400).json({message: err.message})
        } else {
            res.json(updatedHelpfulInfo);
        }
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteHelpOption = async (req, res) => {
    try {
        const { id } = req.params;

        let helpfulInfo = await HelpfulInfoModel.findByIdAndDelete(id);

        res.json(helpfulInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};