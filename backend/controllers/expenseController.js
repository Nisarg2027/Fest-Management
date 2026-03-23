// FILE: backend/src/controllers/expenseController.js
const { createCrudController } = require('./genericController');
module.exports = createCrudController('expenses', 'expense_id');