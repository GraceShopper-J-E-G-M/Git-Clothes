const Sequelize = require("sequelize");
const db = require("../db");
const OrderItem = db.define("orderItem", {
  prodId: {
    type: Sequelize.ARRAY,
    allowNull: false,
  },
  selectedQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  total: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  cartId: {
    type: Sequelize.ARRAY,
    allowNull: false,
  },
});

module.exports = OrderItem;
