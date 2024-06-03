// routes/bidRoutes.js
const express = require('express');
const { getBidsForItem, placeBid } = require('../controllers/bidController');

const router = express.Router({ mergeParams: true });

router.get('/', getBidsForItem);
router.post('/', placeBid);

module.exports = router;
