const Sequelize = require("sequelize");
const db = require("../db");

const Payment = db.define("payment", {
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

module.exports = Payment;
