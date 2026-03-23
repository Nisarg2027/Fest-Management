// FILE: backend/src/controllers/equipmentController.js
const { createCrudController } = require('./genericController');
module.exports = createCrudController('equipments', 'equipment_id');