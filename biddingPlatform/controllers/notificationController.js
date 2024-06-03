// controllers/notificationController.js
const { Notification } = require('../models');

const getNotifications = async (req, res) => {
    const userId = req.user.id;
    try {
        const notifications = await Notification.findAll({ where: { user_id: userId, is_read: false } });
        res.json(notifications);
    } catch (error) {
        res.status(400).json({ error: 'Failed to retrieve notifications' });
    }
};

const markNotificationsRead = async (req, res) => {
    const userId = req.user.id;
    try {
        await Notification.update({ is_read: true }, { where: { user_id: userId } });
        res.json({ message: 'Notifications marked as read' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to mark notifications as read' });
    }
};

module.exports = { getNotifications, markNotificationsRead };
