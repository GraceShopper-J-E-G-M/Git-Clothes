const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/address", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log("userId:", userId);
    const user = await User.findByPk(userId);
    console.log("user:", user);
    const [addresses] = await user.getAddresses();
    console.log("address:", addresses);
    res.json(addresses);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/payment", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log("userId:", userId);
    const user = await User.findByPk(userId);
    console.log("user:", user);
    const payment = await user.getPayment();
    console.log("payment:", payment);
    res.json(payment);
  } catch (err) {
    next(err);
  }
});
