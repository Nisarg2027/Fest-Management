// FILE: backend/src/routes/pscoreRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/pscoreController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.delete('/:judge_id/:participant_id', controller.remove);

module.exports = router;