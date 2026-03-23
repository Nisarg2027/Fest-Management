// FILE: backend/src/controllers/tregisterController.js
const { createJunctionController } = require('./junctionController');
module.exports = createJunctionController({
    tableName: 'tregister',
    pkColumns: ['event_id', 'team_id'],
    pkParams: ['event_id', 'team_id'],
    getQuery: `SELECT tr.*, e.event_name, t.team_name
               FROM tregister tr
               JOIN event e ON tr.event_id = e.event_id
               JOIN team t ON tr.team_id = t.team_id`,
});