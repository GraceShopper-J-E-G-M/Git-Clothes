//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const OrderItem = require("./models/OrderItem");
const Address = require("./models/Address")

//User-Cart: One-to-Many
User.hasMany(Cart);
Cart.belongsTo(User);

//User-Address: One-to-many
User.hasMany(Address);
Address.belongsTo(User);

//Cart-OrderItem: One-to-many
Cart.hasMany(OrderItem);
OrderItem.belongsTo(Cart);

//Product-OrderItem: One-to-many
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
