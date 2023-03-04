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

//`GET` user at /api/users/:userId, include their assosiated address(es).
router.get("/:userId", async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId, { include: [Address] });
      res.send(singleUser);
  } catch (err) {
    next(err);
  }
});
