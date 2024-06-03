// routes/notificationRoutes.js
const express = require('express');
const { getNotifications, markNotificationsRead } = require('../controllers/notificationController');

const router = express.Router();

router.get('/', getNotifications);
router.post('/mark-read', markNotificationsRead);

module.exports = router;
