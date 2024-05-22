const SettingModel = require("../../models/Setting");

module.exports.addSetting = async (req, res) => {
  try {
    const newSetting = new SettingModel(req.body);
    let err = newSetting.validateSync();
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      try {
        const savedSetting = await newSetting.save();
        res.status(201).json(savedSetting);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getAllSettings = async (req, res) => {
  try {
    const settings = await SettingModel.find();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports.getSettingById = async (req, res) => {
  try {
    const { id } = req.params;

    const setting = await SettingModel.findById(id);

    if (!setting) {
      return res.status(404).json({ message: "can not find this setting" });
    }

    res.json(setting);
  } catch (error) {
    console.error("Error getting setting by id", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateSetting = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedSetting = await SettingModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedSetting) {
      return res.status(404).json({ message: "No Setting in database" });
    }
    let err = updatedSetting.validateSync();
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      res.json(updatedSetting);
    }
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteSetting = async (req, res) => {
  try {
    const { id } = req.params;

    await SettingModel.findByIdAndDelete(id);

    res.json({ message: "Setting was deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};