const Sequelize = require("sequelize");
const db = require("../db");

const Address = db.define("address", {
  line1: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  line2: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  zipcode: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Address;