//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const OrderItem = require("./models/OrderItem");
const Address = require("./models/Address");
const Payment = require("./models/Payment");
const Shipping = require("./models/Shipping");
const OrderPayment = require("./models/OrderPayment");

//User-Address: One-to-many
User.hasMany(Address);
Address.belongsTo(User);

//User-Cart: One-to-Many
User.hasMany(Cart);
Cart.belongsTo(User);

//Cart-OrderItem: One-to-many
Cart.hasMany(OrderItem);
OrderItem.belongsTo(Cart);

Cart.hasOne(OrderPayment);
OrderPayment.belongsTo(Cart);

User.hasOne(Payment);
Payment.belongsTo(User);

Cart.hasOne(Shipping);
Shipping.belongsTo(Cart);

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
    Payment,
    Shipping,
    OrderPayment,
  },
};
