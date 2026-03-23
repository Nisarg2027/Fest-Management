// FILE: backend/src/routes/viewRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/viewController');

router.get('/participant-registrations', controller.getParticipantRegistrations);
router.get('/team-registrations', controller.getTeamRegistrations);

module.exports = router;