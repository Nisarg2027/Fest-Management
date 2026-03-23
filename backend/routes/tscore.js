// FILE: backend/src/routes/tscoreRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/tscoreController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.delete('/:judge_id/:team_id', controller.remove);

module.exports = router;