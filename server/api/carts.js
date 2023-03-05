const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const {
  db,
  models: { User, Cart, OrderItem, Product, Payment, Shipping, OrderPayment },
} = require("../db");
const index = require("../db/index");

const createOrderItem = async (qty, prodPrice) => {
  return await OrderItem.create({ quantity: qty, total: qty * prodPrice });
};

const findTotalCartCostQty = async (cartId) => {
  let totalCartCostQty = await OrderItem.findAll({
    attributes: [
      "cartId",
      [sequelize.fn("sum", sequelize.col("total")), "total"],
      [sequelize.fn("sum", sequelize.col("quantity")), "quantity"],
    ],
    group: ["cartId"],
    raw: true,
  });
  console.log("TotalCartCostQty:", totalCartCostQty);
  if (totalCartCostQty.length > 0) {
    for (const orderItem of totalCartCostQty) {
      if (orderItem.cartId === cartId) {
        return {
          totalCartCost: orderItem.total,
          totalCartQty: orderItem.quantity,
        };
      }
    }
  }
};

const updateCart = async (cart, totalCartCost, totalCartQty) => {
  return await cart.update(
    {
      totalCost: totalCartCost,
      totalCartItems: totalCartQty,
    },
    {
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
    }
  );
};

const updateExistingProd = async (cart, userProd, newQuantity) => {
  let updateProd = false;
  let updateOrderItem;
  const existingOrderItems = await cart.getOrderItems();
  for (const orderItem of existingOrderItems) {
    console.log("OrderItem:", orderItem);

    const existingProduct = await orderItem.getProduct();

    if (existingProduct.id === userProd.id) {
      updateProd = true;
      updateOrderItem = orderItem;
      break;
    }
  }
  if (updateProd) {
    console.log("ExistingProd:", updateOrderItem.getProduct());
    await updateOrderItem.update({
      quantity: newQuantity,
      total: newQuantity * userProd.prodPrice,
    });
  } else {
    const newOrderItem = await createOrderItem(newQuantity, userProd.prodPrice);
    console.log("newOrderItem", newOrderItem);
    await newOrderItem.setProduct(userProd);
    await newOrderItem.setCart(cart);
  }
};

router.post("/", async (req, res, next) => {
  try {
    console.log("IN carts Post");
    const userId = req.body.userId;
    const prodId = req.body.prodId;
    const qty = req.body.quantity ? req.body.quantity : 1;

    const user = await User.findByPk(userId);
    const prod = await Product.findByPk(prodId);

    if (qty > prod.prodQuantity) {
      res.sendStatus(404);
      return; // user quantity exceeds the available product quantity
    }

    const pendingCart = await user.getCarts({
      where: {
        status: "Pending",
      },
    });
    const isCartActive = pendingCart.length === 0;
    let cart;

    if (isCartActive) {
      cart = await Cart.create();
      await cart.setUser(user);
    } else {
      [cart] = pendingCart;
    }

    const existingOrderItems = await cart.getOrderItems();
    console.log("Existing OrderItems:", existingOrderItems);
    if (existingOrderItems.length > 0) {
      await updateExistingProd(cart, prod, qty);
      // let updateProd = false;
      // let updateOrderItem;
      // for (const orderItem of existingOrderItems) {
      //   console.log("OrderItem:", orderItem);
      //   const existingProduct = await orderItem.getProduct();
      //   if (existingProduct.id === prod.id) {
      //     updateProd = true;
      //     updateOrderItem = orderItem;
      //     break;
      //   }
      // }
      // if (updateProd) {
      //   console.log("ExistingProd:", updateOrderItem.getProduct());
      //   await updateOrderItem.update({
      //     quantity: qty,
      //     total: qty * prod.prodPrice,
      //   });
      // } else {
      //   const newOrderItem = await createOrderItem(qty, prod.prodPrice);
      //   console.log("newOrderItem", newOrderItem);
      //   await newOrderItem.setProduct(prod);
      //   await newOrderItem.setCart(cart);
      // }
    } else {
      const orderItem = await createOrderItem(qty, prod.prodPrice);
      console.log("orderItem", orderItem);
      await orderItem.setProduct(prod);
      await orderItem.setCart(cart);
    }

    const { totalCartCost, totalCartQty } = await findTotalCartCostQty(cart.id);

    const updatedCart = await updateCart(cart, totalCartCost, totalCartQty);
    console.log("UpdatedCart:", updatedCart);

    res.status(200).json(updatedCart);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const userId = req.query.userId;
    if (userId) {
      //console.log("In db", userId);
      const user = await User.findByPk(userId);
      //const user = req.query.userId;
      //console.log("IN db:", user);
      const [userCart] = await user.getCarts({
        where: {
          status: "Pending",
        },
        include: [
          {
            model: OrderItem,
            include: [
              {
                model: Product,
                attributes: ["prodName", "prodPrice", "prodImg"],
              },
            ],
          },
          {
            model: OrderPayment,
          },
          {
            model: Shipping,
          },
        ],
      });
      res.status(200).json(userCart);
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:orderItemId", async (req, res, next) => {
  try {
    const orderItemId = req.params.orderItemId;
    const userQuantity = req.body.qty;

    console.log("Quantity,orderItemId in DB:", req.body.qty, orderItemId);
    const orderItem = await OrderItem.findByPk(orderItemId);
    const cart = await orderItem.getCart();
    const product = await orderItem.getProduct();

    if (userQuantity > product.prodQuantity) {
      console.log("User Qty not matching");
      res.sendStatus(404);
      return; // user quantity exceeds the available product quantity
    }
    const updatedOrderItem = await orderItem.update({
      quantity: req.body.qty,
      total: req.body.qty * req.body.prodPrice,
    });
    console.log("UpdatedOrderItem:++++++++");
    const { totalCartCost, totalCartQty } = await findTotalCartCostQty(cart.id);
    await updateCart(cart, totalCartCost, totalCartQty);
    res.json(updatedOrderItem);
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    console.log("REQ body:", req.body);
    const totalCostWithTax = req.body.totalCostWithTax;
    const cartId = req.body.cartId;
    const prodList = req.body.cartProdList;
    const cart = await Cart.findByPk(cartId);

    for (const prod of prodList) {
      const product = await Product.findByPk(prod.prodId);
      if (prod.userQty > prod.prodQuantity) {
        res
          .sendStatus(404)
          .send("User quantity is greater than available product quantity");
        return;
      }
      const updateProduct = await product.update({
        prodQuantity: product.prodQuantity - prod.userQty,
      });
    }
    // await payment.setCart(updateCart);
    // await shipping.setCart(updateCart);
    const updateCart = await cart.update({
      totalCost: totalCostWithTax,
      status: "Completed",
    });
    //prod reduce and validations,change cart total and status

    res.send(updateCart);
  } catch (err) {
    next(err);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const orderItemId = req.query.orderItemId;
    const orderItem = await OrderItem.findByPk(orderItemId);
    const cart = await orderItem.getCart();
    await orderItem.destroy();
    //const { totalCartCost, totalCartQty } = await findTotalCartCostQty(cart.id);
    const totalCartCostQty = await findTotalCartCostQty(cart.id);
    const totalCartCost = totalCartCostQty?.totalCartCost;
    const totalCartQty = totalCartCostQty?.totalCartQty;
    let updatedCart;
    if (totalCartCostQty) {
      updatedCart = await updateCart(cart, totalCartCost, totalCartQty);
    } else {
      updatedCart = updateCart(cart, 0, 0);
    }
    //const updatedCart = await updateCart(cart, totalCartCost, totalCartQty);
    console.log("UpdatedCart:", updatedCart);

    res.send(orderItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
