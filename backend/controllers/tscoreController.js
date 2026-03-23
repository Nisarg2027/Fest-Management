// FILE: backend/src/controllers/tscoreController.js
const { createJunctionController } = require('./junctionController');
module.exports = createJunctionController({
    tableName: 'tscore',
    pkColumns: ['judge_id', 'team_id'],
    pkParams: ['judge_id', 'team_id'],
    getQuery: `SELECT ts.*, j.jname as judge_name, t.team_name
               FROM tscore ts
               JOIN judge j ON ts.judge_id = j.judge_id
               JOIN team t ON ts.team_id = t.team_id`,
});