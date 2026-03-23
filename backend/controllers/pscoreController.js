// FILE: backend/src/controllers/pscoreController.js
const { createJunctionController } = require('./junctionController');
module.exports = createJunctionController({
    tableName: 'pscore',
    pkColumns: ['judge_id', 'participant_id'],
    pkParams: ['judge_id', 'participant_id'],
    getQuery: `SELECT ps.*, j.jname as judge_name, p.pname as participant_name
               FROM pscore ps
               JOIN judge j ON ps.judge_id = j.judge_id
               JOIN participants p ON ps.participant_id = p.participant_id`,
});