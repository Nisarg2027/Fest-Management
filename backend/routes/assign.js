// FILE: backend/src/routes/assignRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/assignController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.delete('/:volunteer_id/:event_id', controller.remove);

module.exports = router;