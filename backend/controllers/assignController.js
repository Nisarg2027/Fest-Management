// FILE: backend/src/controllers/assignController.js
const { createJunctionController } = require('./junctionController');
module.exports = createJunctionController({
    tableName: 'assign',
    pkColumns: ['volunteer_id', 'event_id'],
    pkParams: ['volunteer_id', 'event_id'],
    getQuery: `SELECT a.*, v.name as volunteer_name, e.event_name 
               FROM assign a
               JOIN volunteers v ON a.volunteer_id = v.volunteer_id
               JOIN event e ON a.event_id = e.event_id`,
});