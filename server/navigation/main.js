const express = require('express');
const router = express.Router();

const petRoutes = require('./routes/petRoutes');
const contactsRoutes = require('./routes/contactsRoutes');
const helpOptionsRoutes = require('./routes/helpOptionsRoutes');
const imageRoute = require('./routes/imageRoute');
const {verify_token} = require('../auth/auth')

router.get('/get-all-pets',  petRoutes.getAllPets);
router.get('/get-pet/:id', petRoutes.getPetById);
router.get('/get-some-pets', petRoutes.getSomePets);
router.put('/update-pet/:id', verify_token('admin'), petRoutes.updatePet);
router.delete('/delete-pet/:id', verify_token('admin'), petRoutes.deletePet);
router.post('/add-pet', verify_token('admin'), petRoutes.addPet);

router.get('/get-all-contacts', contactsRoutes.getAllContacts);
router.get('/get-contact/:id', contactsRoutes.getContactById);
router.post('/add-contact', verify_token('admin'), contactsRoutes.addContacts);
router.put('/update-contact/:id', verify_token('admin'), contactsRoutes.updateContact);
router.delete('/delete-contact/:id', verify_token('admin'), contactsRoutes.deleteContact);

router.get('/get-all-help-options', helpOptionsRoutes.getAllHelpOptions);
router.get('/get-help-option/:id', helpOptionsRoutes.getHelpOptionById);
router.post('/add-help-option', verify_token('admin'), helpOptionsRoutes.addHelpOptions);
router.put('/update-help-option/:id', verify_token('admin'), helpOptionsRoutes.updateHelpOption);
router.delete('/delete-help-option/:id', verify_token('admin'), helpOptionsRoutes.deleteHelpOption);

router.post('/upload-pet-images', verify_token('admin'), imageRoute.mutlerArray, imageRoute.uploadPetImage);
router.post('/upload-contact-image', verify_token('admin'), imageRoute.mutlerSingle, imageRoute.uploadContactImage);

module.exports = router;