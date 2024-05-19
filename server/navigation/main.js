const express = require('express');
const router = express.Router();

const petRoutes = require('./routes/petRoutes');
const contactsRoutes = require('./routes/contactsRoutes');
const helpOptionsRoutes = require('./routes/helpOptionsRoutes');
const helpfulInfoRoutes = require('./routes/helpfulInfoRoutes');
const adminsRoutes = require('./routes/adminsRoutes');
const imageRoute = require('./routes/imageRoute');
const {verify_token} = require('../auth/auth')

router.get('/get-all-pets',  petRoutes.getAllPets);
router.get('/get-pet/:id', petRoutes.getPetById);
router.get('/get-some-pets', petRoutes.getSomePets);
router.put('/update-pet/:id', verify_token(['super-admin', 'admin']), petRoutes.updatePet);
router.delete('/delete-pet/:id', verify_token(['super-admin', 'admin']), petRoutes.deletePet);
router.post('/add-pet', verify_token(['super-admin', 'admin']), petRoutes.addPet);

router.get('/get-all-contacts', contactsRoutes.getAllContacts);
router.get('/get-contact/:id', contactsRoutes.getContactById);
router.post('/add-contact', verify_token(['super-admin', 'admin']), contactsRoutes.addContacts);
router.put('/update-contact/:id', verify_token(['super-admin', 'admin']), contactsRoutes.updateContact);
router.delete('/delete-contact/:id', verify_token(['super-admin', 'admin']), contactsRoutes.deleteContact);

router.get('/get-all-help-options', helpOptionsRoutes.getAllHelpOptions);
router.get('/get-help-option/:id', helpOptionsRoutes.getHelpOptionById);
router.post('/add-help-option', verify_token(['super-admin', 'admin']), helpOptionsRoutes.addHelpOptions);
router.put('/update-help-option/:id', verify_token(['super-admin', 'admin']), helpOptionsRoutes.updateHelpOption);
router.delete('/delete-help-option/:id', verify_token(['super-admin', 'admin']), helpOptionsRoutes.deleteHelpOption);

router.get('/get-all-helpful-info', helpfulInfoRoutes.getAllHelpfulInfo);
router.get('/get-helpful-info/:id', helpfulInfoRoutes.getHelpfulInfoById);
router.post('/add-helpful-info', verify_token(['super-admin', 'admin']), helpfulInfoRoutes.addHelpfulInfo);
router.put('/update-helpful-info/:id', verify_token(['super-admin', 'admin']), helpfulInfoRoutes.updateHelpfulInfo);
router.delete('/delete-helpful-info/:id', verify_token(['super-admin', 'admin']), helpfulInfoRoutes.deleteHelpOption);

router.post('/upload-pet-images', verify_token(['super-admin', 'admin']), imageRoute.mutlerArray, imageRoute.uploadPetImage);
router.post('/upload-contact-image', verify_token(['super-admin', 'admin']), imageRoute.mutlerSingle, imageRoute.uploadContactImage);

router.get('/get-all-admins', adminsRoutes.getAllAdmins);
router.get('/get-admin/:id', adminsRoutes.getAdminById);
router.put('/update-admin/:id', adminsRoutes.updateAdmin);
router.delete('/delete-admin/:id', adminsRoutes.deleteAdmin);

module.exports = router;