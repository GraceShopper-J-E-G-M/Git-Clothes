const express = require("express");
const router = express.Router();
const {
  db,
  models: { User, Cart, OrderItem, Product, Payment, Shipping, OrderPayment },
} = require("../db");
const index = require("../db/index");

router.post("/:cartId/shipping", async (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const cart = await Cart.findByPk(cartId);
    const shipping = await Shipping.create(req.body);
    await shipping.setCart(cart);
    res.json(shipping);
  } catch (err) {
    next(err);
  }
});

router.get("/shipping/:shippingId", async (req, res, next) => {
  try {
    const shippingId = req.params.shippingId;
    const shipping = await Shipping.findByPk(shippingId);
    res.json(shipping);
  } catch (err) {
    next(err);
  }
});
router.post("/:cartId/payment", async (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const cart = await Cart.findByPk(cartId);
    const payment = await OrderPayment.create(req.body);
    await payment.setCart(cart);
    res.json(payment);
  } catch (err) {
    next(err);
  }
});

router.get("/:cartId", async (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const cart = await Cart.findByPk(cartId, {
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
            },
          ],
        },
        {
          model: OrderPayment,
        },
        {
          model: Shipping,
        },
        {
          model: User,
        },
      ],
    });

    res.json(cart);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
