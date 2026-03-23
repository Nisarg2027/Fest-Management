// FILE: backend/src/routes/supportRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/supportController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.delete('/:event_id/:sponsor_id', controller.remove);

module.exports = router;