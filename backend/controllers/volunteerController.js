// FILE: backend/src/controllers/volunteerController.js
const { createCrudController } = require('./genericController');
module.exports = createCrudController('volunteers', 'volunteer_id');