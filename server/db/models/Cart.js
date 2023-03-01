const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  TotalCost: {
    type: Sequelize.DECIMAL,
    defaultValue: 0,
    allowNull: false,
  },
  TotalCartItems: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("Pending", "Completed"),
    defaultValue: "Pending",
    allowNull: false,
  },
});

module.exports = Cart;