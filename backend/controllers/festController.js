// FILE: backend/src/controllers/festController.js
const { createCrudController } = require('./genericController');
module.exports = createCrudController('fest', 'fest_id');