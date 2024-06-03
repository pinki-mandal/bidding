// routes/itemRoutes.js
const express = require('express');
const { getAllItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/itemController');
const upload = require('../middleware/multer');

const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.post('/', upload.single('image'), createItem);
router.put('/:id', upload.single('image'), updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
