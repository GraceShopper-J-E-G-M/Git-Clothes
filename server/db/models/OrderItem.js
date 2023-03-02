const Sequelize = require("sequelize");
const db = require("../db");
const OrderItem = db.define("orderItem", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  total: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
});

module.exports = OrderItem;
