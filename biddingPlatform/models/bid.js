// models/bid.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Bid', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        item_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'items',
                key: 'id',
            },
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
            allowNull: false,
        },
        bid_amount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'bids',
        timestamps: false,
    });
};
