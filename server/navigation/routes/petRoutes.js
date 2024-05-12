const PetModel = require('../../models/Pet');
const fs = require('fs');
const path = require('path');
//add pet
module.exports.addPet = async (req, res) => {
    try {
        const newPet = new PetModel(req.body);
        let err = newPet.validateSync()
        if (err) {
            res.status(400).json({message: err.message})
        } else {
            try {
                const savedPet = await newPet.save();
                res.status(201).json(savedPet);
            } catch (err) {
                res.status(500).json({message: err.message})
            }
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//edit pet
module.exports.updatePet = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body)
        const updatedPet = await PetModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPet) {
            console.log("Doesnt update")
            return res.status(404).json({ message: 'No pet in database' });
        }
        let err = updatedPet.validateSync()
        if (err) {
            console.log("NMot valid")
            res.status(400).json({message: err.message})
        } else {
            console.log("done")
            res.json(updatedPet);
        }
    } catch (err) {
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

module.exports.getPetById = async (req, res) => {
    try {
        const { id } = req.params;

        const pet = await PetModel.findById(id);

        if (!pet) {
            return res.status(404).json({ message: 'can not find this pet' });
        }

        res.json(pet);
    } catch (error) {
        console.error('Error getting pet by id', error);
        res.status(500).json({ message: error.message });
    }
};

//edit pet
module.exports.updatePet = async (req, res) => {
    try {
        const { id } = req.params;
        const existedPet = await PetModel.findById(id)
        
        existedPet.images.forEach((img) => {
            if (!req.body.images.includes(img)) {
                const imagePath = path.join(__dirname, '../../uploads', img)
                fs.unlink(imagePath, err => {if (err) {
                    console.error(err);
                    return res.status(500).json({ message: err.message });
                }})
            }
        })
        
        const updatedPet = await PetModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedPet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//delete pet
module.exports.deletePet = async (req, res) => {
    try {
        const { id } = req.params;
        
        const pet = await PetModel.findById(id);

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        pet.images.forEach((img) => {
            const imagesPath = path.join(__dirname, '../../uploads', img);
            fs.unlink(imagesPath, err => {       
                if (err) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }})
        });

        var pet = await PetModel.findByIdAndDelete(id);

        res.json(pet);
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