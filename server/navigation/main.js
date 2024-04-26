const express = require('express');
const router = express.Router();

const petRoutes = require('./routes/petRoutes');
const contactsRoutes = require('./routes/contactsRoutes');
const helpOptionsRoutes = require('./routes/helpOptionsRoutes');
const imageRoute = require('./routes/imageRoute');

router.get('/get-all-pets', petRoutes.getAllPets);
router.get('/get-pet/:id', petRoutes.getPetById);
router.put('/update-pet/:id', petRoutes.updatePet);
router.delete('/delete-pet/:id', petRoutes.deletePet);
router.get('/get-some-pets', petRoutes.getSomePets);
router.post('/add-pet', petRoutes.addPet);

router.post('/add-contact', contactsRoutes.addContacts);
router.get('/get-all-contacts', contactsRoutes.getAllContacts);
router.get('/get-contact/:id', contactsRoutes.getContactById);
router.put('/update-contact/:id', contactsRoutes.updateContact);
router.delete('/delete-contact/:id', contactsRoutes.deleteContact);

router.post('/add-help-option', helpOptionsRoutes.addHelpOptions);
router.get('/get-all-help-options', helpOptionsRoutes.getAllHelpOptions);
router.get('/get-help-option/:id', helpOptionsRoutes.getHelpOptionById);
router.put('/update-help-option/:id', helpOptionsRoutes.updateHelpOption);
router.delete('/delete-help-option/:id', helpOptionsRoutes.deleteHelpOption);

router.post('/upload-images', imageRoute.mutler, imageRoute.uploadImage);

module.exports = router;