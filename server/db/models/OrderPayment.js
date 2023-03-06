const Sequelize = require("sequelize");
const db = require("../db");

const OrderPayment = db.define("orderpayment", {
  card: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cvv: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  expiryYear: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = OrderPayment;
