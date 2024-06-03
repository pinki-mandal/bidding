// controllers/itemController.js
const { Item } = require('../models');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');

// Get all items with pagination, search, and filtering
const getAllItems = async (req, res) => {
    const { page = 1, size = 10, search = '', status = 'active' } = req.query;
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;

    const where = {
        [Op.and]: [
            {
                name: { [Op.like]: `%${search}%` },
                description: { [Op.like]: `%${search}%` }
            }
        ]
    };

    if (status === 'active') {
        where.end_time = { [Op.gte]: new Date() };
    } else if (status === 'ended') {
        where.end_time = { [Op.lt]: new Date() };
    }

    try {
        const { rows, count } = await Item.findAndCountAll({
            where,
            limit,
            offset
        });
        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            items: rows
        });
    } catch (error) {
        res.status(400).json({ error: 'Failed to retrieve items' });
    }
};

// Get an item by its ID
const getItemById = async (req, res) => {
    const itemId = req.params.id;
    try {
        const item = await Item.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: 'Failed to retrieve item' });
    }
};

// Create a new item
const createItem = async (req, res) => {
    const { name, description, starting_price, end_time } = req.body;
    console.log(req.body)
    const image_url = req.file ? req.file.path : null;
    try {
        const item = await Item.create({ name, description, starting_price, current_price: starting_price, image_url, end_time });
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create item' });
    }
};

// Update an existing item
const updateItem = async (req, res) => {
    const itemId = req.params.id;
    const { name, description, starting_price, end_time } = req.body;
    const image_url = req.file ? req.file.path : null;
    try {
        const item = await Item.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        await item.update({ name, description, starting_price, end_time, image_url });
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update item' });
    }
};

// Delete an item by its ID
const deleteItem = async (req, res) => {
    const itemId = req.params.id;
    try {
        const item = await Item.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        if (item.image_url) {
            fs.unlinkSync(path.join(__dirname, '..', item.image_url));
        }
        await item.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete item' });
    }
};

module.exports = { getAllItems, getItemById, createItem, updateItem, deleteItem };
