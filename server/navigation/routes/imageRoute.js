const path = require('path');
const fs = require('fs');
const upload = require('../middleware/upload');

module.exports.uploadImage = upload.array('images'), async (req, res) => {
    try {
        const uploadedImages = req.files;
        const imagePaths = [];

        for (const image of uploadedImages) {
            const imagePath = `uploads/${image.filename}`;

            imagePaths.push(imagePath);
        }

        res.json(imagePaths);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}