// FILE: backend/src/routes/evaluateRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/evaluateController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.delete('/:event_id/:judge_id', controller.remove);

module.exports = router;