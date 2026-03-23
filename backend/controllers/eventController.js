// FILE: backend/src/controllers/eventController.js
const { createCrudController } = require('./genericController');
module.exports = createCrudController('event', 'event_id');