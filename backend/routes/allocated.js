// FILE: backend/src/routes/allocatedRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/allocatedController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.delete('/:event_id/:equipment_id', controller.remove);

module.exports = router;