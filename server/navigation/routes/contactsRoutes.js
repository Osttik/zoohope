const ContactsModel = require('../../models/Contacts');
const fs = require('fs');
const path = require('path');

//add contacts
module.exports.addContacts = async (req, res) => {
    try {
        const newContact = new ContactsModel(req.body);
        let err = newContact.validateSync()
        if (err) {
            res.status(400).json({message: err.message})
        } else {
            try {
                const savedContact = await newContact.save();
                res.status(201).json(savedContact);
            } catch (err) {
                res.status(500).json({message: err.message})
            }
        }
    } catch (err) {
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

module.exports.getContactById = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await ContactsModel.findById(id);

        if (!contact) {
            return res.status(404).json({ message: 'can not find this contact' });
        }

        res.json(contact);
    } catch (error) {
        console.error('Error getting contact by id', error);
        res.status(500).json({ message: error.message });
    }
};

//update contacts
module.exports.updateContact = async (req, res) => {
    try {
        const { id } = req.params;

        const existedContact = await ContactsModel.findById(id)

        const existedImage = existedContact.icon
        const newImage = req.body.icon

        if (newImage !== existedImage && existedImage) {
            imagePath = path.join(__dirname, "../../uploads", existedImage)
            fs.unlinkSync(imagePath)
        }

        const updatedContact = await ContactsModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedContact) {
            return res.status(404).json({ message: 'No contact in database' });
        }
        let err = updatedContact.validateSync()
        if (err) {
            res.status(400).json({message: err.message})
        } else {
            res.json(updatedContact)
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//delete contacts
module.exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await ContactsModel.findById(id)
        
        var contact = await ContactsModel.findByIdAndDelete(id);

        const image = contact.icon

        if (image) {
            const imagePath = path.join(__dirname, "../../uploads", image)
            fs.unlinkSync(imagePath)
        }

        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};