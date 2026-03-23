// FILE: backend/src/routes/tregisterRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/tregisterController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.delete('/:event_id/:team_id', controller.remove);

module.exports = router;