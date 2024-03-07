const ContactsModel = require('../../models/Contacts');

//add contacts
module.exports.addContacts = async (req, res) => {
    try {
        const newContact = new ContactsModel(req.body);
        const savedContact = await newContact.save();

        res.status(201).json(savedContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get all contacts
module.exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await ContactsModel.find();

        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//update contacts
module.exports.updateContact = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedContact = await ContactsModel.findByIdAndUpdate(id, req.body, { new: true });

        res.json(updatedContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete contacts
module.exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        await ContactsModel.findByIdAndDelete(id);

        res.json({ message: 'Contact was deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};