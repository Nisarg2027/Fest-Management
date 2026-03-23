// FILE: backend/src/controllers/judgeController.js
const { createCrudController } = require('./genericController');
module.exports = createCrudController('judge', 'judge_id');