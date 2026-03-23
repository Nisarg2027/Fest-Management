// FILE: backend/src/routes/pregisterRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/pregisterController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.delete('/:event_id/:participant_id', controller.remove);

module.exports = router;