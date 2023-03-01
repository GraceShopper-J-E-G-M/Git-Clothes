const Sequelize = require("sequelize");
const db = require("../db");
const Product = db.define("product", {
  prodName: {
    type: Sequelize.CHAR(255),
    allowNull: false,
  },
  prodQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  prodPrice: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  prodSize: {
    type: Sequelize.CHAR(255),
    allowNull: false,
  },
  prodColor: {
    type: Sequelize.ARRAY(Sequelize.CHAR),
    allowNull: false,
  },
  prodImg: {
    type: Sequelize.CHAR(255),
    defaultValue: "/clothing_default.jpg",
  },
});
module.exports = Product;
