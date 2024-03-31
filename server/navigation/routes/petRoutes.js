const PetModel = require('../../models/Pet');

//add pet
module.exports.addPet = async (req, res) => {
    try {
        const newPet = new PetModel(req.body);
        const savedPet = await newPet.save();

        res.status(201).json(savedPet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get all pets
module.exports.getAllPets = async (req, res) => {
    try {
        const allPets = await PetModel.find();

        res.json(allPets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

//edit pet
module.exports.updatePet = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedPet = await PetModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedPet) {
            return res.status(404).json({ message: 'No pet in database' });
        }

        res.json(updatedPet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete pet
module.exports.deletePet = async (req, res) => {
    try {
        const { id } = req.params;

        await PetModel.findByIdAndDelete(id);

        res.json({ message: 'Pet was deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get pets with pagination
module.exports.getSomePets = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limitValue = parseInt(req.query.limit) || 20;
    const omitValue = (page - 1) * limitValue; 

    try {
        const pets = await PetModel.find().skip(omitValue).limit(limitValue);
        
        res.json(pets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};