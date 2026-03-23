// FILE: backend/src/controllers/supportController.js
const { createJunctionController } = require('./junctionController');
module.exports = createJunctionController({
    tableName: 'support',
    pkColumns: ['event_id', 'sponsor_id'],
    pkParams: ['event_id', 'sponsor_id'],
    getQuery: `SELECT s.*, e.event_name, sp.sname as sponsor_name 
               FROM support s
               JOIN event e ON s.event_id = e.event_id
               JOIN sponsors sp ON s.sponsor_id = sp.sponsor_id`,
});