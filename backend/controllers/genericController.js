const db = require('../db');

const handleDbError = (res, err) => {
  console.error(err.message);
  if (err.code === '23503') {
    return res.status(400).json({ error: `Operation failed: A related record does not exist. Details: ${err.detail}` });
  }
  if (err.code === '23505') {
    return res.status(400).json({ error: `Operation failed: This record already exists. Details: ${err.detail}` });
  }
  if (err.code === '23514') {
    return res.status(400).json({ error: `Operation failed: The data violates a check constraint. Details: ${err.detail}` });
  }
  return res.status(500).json({ error: 'Server error occurred.' });
};

exports.createCrudController = (tableName, primaryKey) => {
  const getAll = async (req, res) => {
    try {
      const { rows } = await db.query(`SELECT * FROM ${tableName} ORDER BY ${primaryKey}`);
      res.json(rows);
    } catch (err) {
      handleDbError(res, err);
    }
  };

  const getById = async (req, res) => {
    try {
      const { id } = req.params;
      const { rows } = await db.query(`SELECT * FROM ${tableName} WHERE ${primaryKey} = $1`, [id]);
      if (rows.length === 0) return res.status(404).json({ msg: `${tableName} with ID ${id} not found` });
      res.json(rows[0]);
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

  const update = async (req, res) => {
    try {
      const { id } = req.params;
      const fieldsToUpdate = { ...req.body };
      delete fieldsToUpdate[primaryKey];

      const setString = Object.keys(fieldsToUpdate).map((key, i) => `${key} = $${i + 1}`).join(', ');
      const values = [...Object.values(fieldsToUpdate), id];
      const { rows } = await db.query(`UPDATE ${tableName} SET ${setString} WHERE ${primaryKey} = $${values.length} RETURNING *`, values);
      if (rows.length === 0) return res.status(404).json({ msg: `${tableName} not found` });
      res.json(rows[0]);
    } catch (err) {
      handleDbError(res, err);
    }
  };

  const remove = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await db.query(`DELETE FROM ${tableName} WHERE ${primaryKey} = $1 RETURNING *`, [id]);
      if (result.rowCount === 0) return res.status(404).json({ msg: `${tableName} not found` });
      res.json({ msg: `${tableName} deleted` });
    } catch (err) {
      handleDbError(res, err);
    }
  };

  return { getAll, getById, create, update, remove };
};

module.exports.handleDbError = handleDbError;