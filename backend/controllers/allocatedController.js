// FILE: backend/src/controllers/allocatedController.js
const { createJunctionController } = require('./junctionController');
module.exports = createJunctionController({
    tableName: 'allocated',
    pkColumns: ['event_id', 'equipment_id'],
    pkParams: ['event_id', 'equipment_id'],
    getQuery: `SELECT a.*, e.event_name, eq.name as equipment_name 
               FROM allocated a 
               JOIN event e ON a.event_id = e.event_id
               JOIN equipments eq ON a.equipment_id = eq.equipment_id`,
});