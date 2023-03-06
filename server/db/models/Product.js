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
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  prodSize: {
    type: Sequelize.ENUM("XS", "S", "M", "L", "XL", "XXL"),
    defaultValue: "XS",
    allowNull: false,
  },
  prodColor: {
    type: Sequelize.ENUM(
      "Red",
      "Pink",
      "Plum",
      "Mustard",
      "Burgundy",
      "Forest Green",
      "Beige",
      "Olive",
      "Grey",
      "Black",
      "Brown",
      "Dark Brown",
      "Blue"
    ),
    defaultValue: "Red",
    allowNull: false,
  },
  prodImg: {
    type: Sequelize.CHAR(255),
    defaultValue: "/clothing_default.jpg",
  },
});

// Product.getAttributes().prodSize.values;
module.exports = Product;
// const sizeArray = Product.getAttributes().prodSize.values;
// const colorArray = Product.getAttributes().prodColor.values;
