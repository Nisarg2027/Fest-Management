import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET team registrations view
router.get('/team-registrations', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM team_registrations ORDER BY registration_date DESC');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// GET participant registrations view
router.get('/participant-registrations', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM participant_registrations ORDER BY registration_date DESC');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

export default router;
