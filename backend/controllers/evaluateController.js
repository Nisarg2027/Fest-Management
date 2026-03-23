// FILE: backend/src/controllers/evaluateController.js
const { createJunctionController } = require('./junctionController');
module.exports = createJunctionController({
    tableName: 'evaluate',
    pkColumns: ['event_id', 'judge_id'],
    pkParams: ['event_id', 'judge_id'],
    getQuery: `SELECT ev.*, e.event_name, j.jname as judge_name
               FROM evaluate ev
               JOIN event e ON ev.event_id = e.event_id
               JOIN judge j ON ev.judge_id = j.judge_id`,
});