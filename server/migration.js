const migrateData = require('./migrations/CreationOfTranslationForPetName');

migrateData().catch(console.error);