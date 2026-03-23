// FILE: backend/src/controllers/participantController.js
const { createCrudController } = require('./genericController');
module.exports = createCrudController('participants', 'participant_id');