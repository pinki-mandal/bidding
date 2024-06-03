
require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { sequelize } = require('./models');
const routes = require('./routes');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
const rateLimit = require('./middleware/rateLimit');
const { authenticateSocket } = require('./middleware/authSocket');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger);
app.use('/api/', rateLimit);
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

io.use(authenticateSocket);
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('bid', (bid) => {
        io.emit('update', bid);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
    try {
        await sequelize.sync();
        console.log(`Server is running on port ${PORT}`);
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
});

module.exports = { app, server };
