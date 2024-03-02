const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ContactsModel = require('./models/Contacts');
const HelpOptionsModel = require('./models/HelpOption');
const PetModel = require('./models/Pet');

const app = express();
const port = process.env.PORT || 5000;
const databaseUrl = 'mongodb+srv://buriakkdiana:u13d15m22@zoonadiya.0brdjij.mongodb.net/?retryWrites=true&w=majority&appName=zoonadiya';

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI || databaseUrl)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });


//add pet
app.post('add-pet', async (req, res) => {
    try {
        const { name, image, sex, age, size, breed, color, personality, story } = req.body;

        const newPet = new PetModel({ name, image, sex, age, size, breed, color, personality, story });
        const savedPet = await newPet.save();

        res.status(201).json(savedPet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get all pets
app.get('get-all-pets', async (req, res) => {
    try {
        const allPets = await PetModel.find();

        res.json(allPets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

//edit pet
app.put('update-pet/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, sex, age, size, breed, color, personality, story } = req.body;

        const updatedPet = await PetModel.findByIdAndUpdate(id, { name, image, sex, age, size, breed, color, personality, story }, { new: true });

        if (!updatedPet) {
            return res.status(404).json({ message: "No pet in database" });
        }

        res.json(updatedPet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete pet
app.delete('delete-pet/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await PetModel.findByIdAndDelete(id);

        res.json({ message: 'Pet was deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get pets with pagination
app.get('get-some-pets', async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limitValue = 20; 
    const omitValue = (page - 1) * limit; 

    try {
        const pets = await PetModel.find().skip(omitValue).limit(limitValue);
        res.json(pets);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//add contacts
app.post('add-contact', async (req, res) => {
    try {
        const { name, url, icon } = req.body;

        const newContact = new ContactsModel({ name, url, icon });
        const savedContact = await newContact.save();

        res.status(201).json(savedContact);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get all contacts
app.get('get-all-contacts', async (req, res) => {
    try {
        const contacts = await ContactsModel.find();

        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//update contacts
app.put('update-contact/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, url, icon } = req.body;

        const updatedContact = await ContactsModel.findByIdAndUpdate(id, { name, url, icon }, { new: true });

        res.json(updatedContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete contacts
app.delete('delete-contact/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await ContactsModel.findByIdAndDelete(id);

        res.json({ message: 'Contact was deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

//add help options
app.post('add-help-option', async (req, res) => {
    try {
        const { name, description } = req.body;

        const newHelpOption = new HelpOptionsModel({ name, description });
        const savedHelpOption = await newHelpOption.save();

        res.status(201).json(savedHelpOption);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get all help options
app.get('get-all-help-options', async (req, res) => {
    try {
        const helpOptions = await HelpOptionsModel.find();

        res.json(helpOptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//update help options
app.put('update-help-option/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const updatedHelpOption = await HelpOptionsModel.findByIdAndUpdate(id, { name, description }, { new: true });

        res.json(updatedHelpOption);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete help options
app.delete('delete-help-option/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await HelpOptionsModel.findByIdAndDelete(id);

        res.json({ message: 'Help option was deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});