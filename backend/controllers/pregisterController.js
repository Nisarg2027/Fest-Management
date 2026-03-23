// FILE: backend/src/controllers/pregisterController.js
const { createJunctionController } = require('./junctionController');
module.exports = createJunctionController({
    tableName: 'pregister',
    pkColumns: ['event_id', 'participant_id'],
    pkParams: ['event_id', 'participant_id'],
    getQuery: `SELECT pr.*, e.event_name, p.pname as participant_name
               FROM pregister pr
               JOIN event e ON pr.event_id = e.event_id
               JOIN participants p ON pr.participant_id = p.participant_id`,
});