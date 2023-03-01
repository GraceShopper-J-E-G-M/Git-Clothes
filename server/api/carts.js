const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const {
  db,
  models: { User, Cart, OrderItem, Product },
} = require("../db");
const index = require("../db/index");

router.post("/", async (req, res, next) => {
  try {
    console.log("IN carts Post");
    const userId = req.body.userId;
    const prodId = req.body.prodId;
    const qty = req.body.quantity;
    const user = await User.findByPk(userId);
    const prod = await Product.findByPk(prodId);
    const isCart = await user.getCarts();
    let cart;
    const pendingCart = isCart.findIndex((ct) => ct.status === "Pending");
    console.log(pendingCart);
    console.log(isCart);
    if (pendingCart === -1) {
      console.log("Creation of new cart");
      cart = await Cart.create();
      cart.setUser(user);
      const orderItem = await OrderItem.create({
        quantity: qty,
        total: qty * prod.prodPrice,
      });
      await orderItem.setProduct(prod);
      await orderItem.setCart(cart);
      const TotalCartItems = await OrderItem.findAndCountAll({
        where: {
          cartId: cart.id,
        },
      });
      console.log("Total number of cart items:", TotalCartItems);
      const totalOrderItemsCost = await OrderItem.findAll({
        attributes: [
          "cartId",
          [sequelize.fn("sum", sequelize.col("total")), "total"],
        ],
        group: ["cartId"],
        raw: true,
      });
      console.log("Total order items cost:", totalOrderItemsCost);
      let totalOrdersCost;
      for (const orderItem of totalOrderItemsCost) {
        if (orderItem.cartId === cart.id) {
          totalOrdersCost = orderItem.total;
          break;
        }
      }
      await cart.update({
        TotalCost: totalOrdersCost,
        TotalCartItems: await cart.countOrderItems(),
      });
      console.log("Total order items cost:", totalOrderItemsCost);
      res.status(200).json(cart);
    } else {
      console.log("Adding to existing cart");
      cart = await user.getCarts();

      const activeCart = cart[pendingCart];
      const orderItem = await OrderItem.create({
        quantity: qty,
        total: qty * prod.prodPrice,
      });
      await orderItem.setProduct(prod);
      await orderItem.setCart(activeCart);

      const totalOrderItemsCost = await OrderItem.findAll({
        attributes: [
          "cartId",
          [sequelize.fn("sum", sequelize.col("total")), "total"],
        ],
        group: ["cartId"],
        raw: true,
      });
      let totalOrdersCost;
      for (const orderItem of totalOrderItemsCost) {
        if (orderItem.cartId === activeCart.id) {
          totalOrdersCost = orderItem.total;
          break;
        }
      }
      console.log(totalOrdersCost);
      await activeCart.update({
        TotalCost: totalOrdersCost,
        TotalCartItems: await activeCart.countOrderItems(),
      });
      console.log("Total order items cost:", totalOrderItemsCost);
      res.status(200).json(activeCart);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    const userCart = await user.getCarts({
      where: {
        status: "Pending",
      },
      include: OrderItem,
    });
    res.status(200).json(userCart);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
