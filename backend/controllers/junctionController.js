// FILE: backend/src/controllers/junctionController.js
// A factory for junction tables to keep code DRY
const db = require('../db');
const { handleDbError } = require('./genericController'); // Now it can be properly imported

exports.createJunctionController = ({
  tableName,
  pkColumns,
  pkParams, // e.g., ['eventId', 'sponsorId'] from the route params
  getQuery,
}) => {
  const getAll = async (req, res) => {
    try {
      const { rows } = await db.query(getQuery);
      res.json(rows);
    } catch (err) {
      handleDbError(res, err);
    }
  };

  const create = async (req, res) => {
    try {
      const columns = Object.keys(req.body).join(', ');
      const placeholders = Object.keys(req.body).map((_, i) => `$${i + 1}`).join(', ');
      const values = Object.values(req.body);
      const { rows } = await db.query(`INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) RETURNING *`, values);
      res.status(201).json(rows[0]);
    } catch (err) {
      handleDbError(res, err);
    }
  };

  const remove = async (req, res) => {
    try {
      const whereClause = pkColumns.map((col, i) => `${col} = $${i + 1}`).join(' AND ');
      const values = pkParams.map(param => req.params[param]);

      if (values.some(v => v === undefined)) {
        return res.status(400).json({ error: 'Missing one or more primary key parameters in the URL.' });
      }

      const result = await db.query(`DELETE FROM ${tableName} WHERE ${whereClause} RETURNING *`, values);
      if (result.rowCount === 0) return res.status(404).json({ msg: 'Record not found' });
      res.json({ msg: 'Record deleted' });
    } catch (err)
 {
      handleDbError(res, err);
    }
  };

  return { getAll, create, remove };
};