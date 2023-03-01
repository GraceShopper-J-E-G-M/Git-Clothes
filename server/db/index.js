//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const OrderItem = require("./models/OrderItem");

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.hasMany(OrderItem);
OrderItem.belongsTo(Cart);
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    OrderItem,
  },
};
