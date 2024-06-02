const MailModel = require("../../models/Mail");
const SettingModel = require("../../models/Setting");
const { sendMail } = require("../../nodemailer/mailer");

module.exports.sendMail = async (req, res) => {
  try {
    const techEmail = await SettingModel.findOne({ key: "Techemail" });
    const recipientEmail = await SettingModel.findOne({
      key: "Recipientemail",
    });
    const techPassword = await SettingModel.findOne({ key: "Techpassword" });
    console.log(techEmail, recipientEmail, techPassword);
    sendMail(
      req.body.email,
      req.body.msg,
      req.body.firstName,
      req.body.lastName,
      req.body.phone,
      techEmail.value,
      recipientEmail.value,
      techPassword.value
    );
    const newMail = new MailModel(req.body);
    let err = newMail.validateSync();
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      try {
        const savedMail = await newMail.save();
        res.status(201).json(savedMail);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getAllMails = async (req, res) => {
  try {
    const mails = await MailModel.find();
    res.json(mails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
