const migrateData = require('./migrations/contactsTranslationMigration');

migrateData().catch(console.error);