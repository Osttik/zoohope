const upload = require('../middleware/upload');

module.exports.mutlerArray = upload.array('images');
module.exports.uploadPetImage = async (req, res) => {
    try {
        const uploadedImages = req.files;
        const imagePaths = [];

        for (const image of uploadedImages) {
            const imagePath = `${image.filename}`;

            imagePaths.push(imagePath);
        }
        
        res.json(imagePaths);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.mutlerSingle = upload.single('image');
module.exports.uploadContactImage = async (req, res) => {
    try {
        const uploadedImage = req.file;
        const imagePath = uploadedImage ? uploadedImage.filename : null;

        res.json(imagePath);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};