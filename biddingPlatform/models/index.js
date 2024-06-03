// models/index.js
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
});

const User = require('./user')(sequelize);
const Item = require('./item')(sequelize);
const Bid = require('./bid')(sequelize);
const Notification = require('./notification')(sequelize);

User.hasMany(Bid, { foreignKey: 'user_id' });
User.hasMany(Notification, { foreignKey: 'user_id' });
Item.hasMany(Bid, { foreignKey: 'item_id' });
Bid.belongsTo(User, { foreignKey: 'user_id' });
Bid.belongsTo(Item, { foreignKey: 'item_id' });

module.exports = {
    sequelize,
    User,
    Item,
    Bid,
    Notification,
};
