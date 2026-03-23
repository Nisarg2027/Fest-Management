// FILE: backend/src/controllers/teamController.js
const { createCrudController } = require('./genericController');
module.exports = createCrudController('team', 'team_id');