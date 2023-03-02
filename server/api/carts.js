const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const {
  db,
  models: { User, Cart, OrderItem, Product },
} = require("../db");
const index = require("../db/index");

// const requireToken = async (req, res, next) => {
//   try {
//     const reqToken = req.headers.authorization;
//     const reqUser = await User.byToken(reqToken);
//     req.user = reqUser;
//     next();
//   } catch (ex) {
//     next(ex);
//   }
// };

router.post("/", async (req, res, next) => {
  try {
    console.log("IN carts Post");
    //const requser = req.body.user;
    const userId = req.body.userId;
    //const userId = requser.userId;
    const prodId = req.body.prodId;
    const qty = req.body.quantity;
    const user = await User.findByPk(userId);
    const prod = await Product.findByPk(prodId);
    const isCartActive = await user.getCarts({
      where: {
        status: "Pending",
      },
    });
    let cart;
    //const pendingCart = isCart.findIndex((ct) => ct.status === "Pending");
    //console.log(pendingCart);
    //console.log(isCartActive);
    if (isCartActive.length === 0) {
      console.log("Creation of new cart");
      cart = await Cart.create();
      await cart.setUser(user);
      const orderItem = await OrderItem.create({
        quantity: qty,
        total: qty * prod.prodPrice,
      });
      await orderItem.setProduct(prod);
      await orderItem.setCart(cart);

      const totalOrderItemsCost = await OrderItem.findAll({
        attributes: [
          "cartId",
          [sequelize.fn("sum", sequelize.col("total")), "total"],
          [sequelize.fn("sum", sequelize.col("quantity")), "quantity"],
        ],
        group: ["cartId"],
        raw: true,
      });
      console.log("Total order items cost:", totalOrderItemsCost);
      let totalOrdersCost, totalCartQty;
      for (const orderItem of totalOrderItemsCost) {
        if (orderItem.cartId === cart.id) {
          totalOrdersCost = orderItem.total;
          totalCartQty = orderItem.quantity;
          break;
        }
      }

      await cart.update({
        TotalCost: totalOrdersCost,
        TotalCartItems: totalCartQty,
      });
      console.log("Total order items cost:", totalOrderItemsCost);
      res.status(200).json(cart);
    } else {
      console.log("Adding to existing cart");
      cart = await user.getCarts({
        where: {
          status: "Pending",
        },
      });
      console.log("ActiveCart:", cart);
      //const activeCart = cart[pendingCart];
      const orderItem = await OrderItem.create({
        quantity: qty,
        total: qty * prod.prodPrice,
      });
      await orderItem.setProduct(prod);
      await orderItem.setCart(cart[0]);

      const totalOrderItemsCost = await OrderItem.findAll({
        attributes: [
          "cartId",
          [sequelize.fn("sum", sequelize.col("total")), "total"],
          [sequelize.fn("sum", sequelize.col("quantity")), "quantity"],
        ],
        group: ["cartId"],
        raw: true,
      });
      let totalOrdersCost, totalCartQty;
      for (const orderItem of totalOrderItemsCost) {
        if (orderItem.cartId === cart[0].id) {
          totalOrdersCost = orderItem.total;
          totalCartQty = orderItem.quantity;
          break;
        }
      }
      console.log(totalOrdersCost);

      await cart[0].update({
        TotalCost: totalOrdersCost,
        TotalCartItems: totalCartQty,
      });
      console.log("Total order items cost:", totalOrderItemsCost);
      res.status(200).json(cart);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const user = await User.findByPk(userId);
    const userCart = await user.getCarts({
      where: {
        status: "Pending",
      },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ["prodName", "prodPrice"],
            },
          ],
        },
      ],
    });
    res.status(200).json(userCart);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
