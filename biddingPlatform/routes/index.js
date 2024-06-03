// routes/index.js
const express = require('express');
const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');
const bidRoutes = require('./bidRoutes');
const notificationRoutes = require('./notificationRoutes');
const auth = require('../middleware/auth');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/items', auth, itemRoutes);
router.use('/items/:itemId/bids', auth, bidRoutes);
router.use('/notifications', auth, notificationRoutes);

module.exports = router;
