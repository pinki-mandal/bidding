// controllers/bidController.js
const { Bid, Item, Notification } = require('../models');
const io = require('../server').io;

const getBidsForItem = async (req, res) => {
    const itemId = req.params.itemId;
    try {
        const bids = await Bid.findAll({ where: { item_id: itemId } });
        res.json(bids);
    } catch (error) {
        res.status(400).json({ error: 'Failed to retrieve bids' });
    }
};

const placeBid = async (req, res) => {
    const itemId = req.params.itemId;
    const { bid_amount } = req.body;
    const userId = req.user.id;
    try {
        const item = await Item.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        if (new Date(item.end_time) < new Date()) {
            return res.status(400).json({ error: 'Auction has ended' });
        }
        const bid = await Bid.create({ item_id: itemId, user_id: userId, bid_amount });
        await item.update({ current_price: bid_amount });

        const notification = await Notification.create({ user_id: item.user_id, message: `New bid on your item: ${item.name}` });
        io.emit('update', bid);
        io.emit('notify', notification);

        res.status(201).json(bid);
    } catch (error) {
        res.status(400).json({ error: 'Failed to place bid' });
    }
};

module.exports = { getBidsForItem, placeBid };
