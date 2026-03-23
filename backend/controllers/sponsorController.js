// FILE: backend/src/controllers/sponsorController.js
const { createCrudController } = require('./genericController');
module.exports = createCrudController('sponsors', 'sponsor_id');