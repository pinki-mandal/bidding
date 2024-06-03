// middleware/authSocket.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticateSocket = async (socket, next) => {
    const token = socket.handshake.query.token;
    if (!token) {
        return next(new Error('No token provided'));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return next(new Error('Invalid token'));
        }
        socket.user = user;
        next();
    } catch (error) {
        next(new Error('Invalid token'));
    }
};

module.exports = authenticateSocket;
