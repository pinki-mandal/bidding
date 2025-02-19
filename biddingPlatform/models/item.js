// models/item.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Item', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        starting_price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        current_price: {
            type: DataTypes.DECIMAL,
            defaultValue: DataTypes.NOW,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'items',
        timestamps: false,
    });
};
