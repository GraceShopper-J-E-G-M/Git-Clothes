const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const Address = require("../db/models/Address");
module.exports = router;

//`GET` users at /api/users, include only their id, username, and email.
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username", "email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/address", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    const [addresses] = await user.getAddresses();
    res.json(addresses);
  } catch (err) {
    next(err);
  }
});

//`GET` user at /api/users/:userId, include their assosiated address(es).
router.get("/:userId", async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId, {
      include: [Address],
    });
    res.send(singleUser);
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

router.put("/:userId", async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId);
    await singleUser.update(req.body);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * DELETE `/api/users/:userId` is a route to remove a user (based on its id).
 */
router.delete("/:userId", async (req, res, next) => {
  try {
    const userToDelete = await User.findByPk(req.params.userId);
    console.log(userToDelete);
    await userToDelete.destroy();
    res.send(userToDelete);
  } catch (error) {
    next(error);
  }
});