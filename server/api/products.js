const router = require('express').Router();
const { Product } = require('../db');

//get all

//get single product
router.get("/:id", async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        res.status(404).send();
      } else {
        res.status(200).send(product);
      }
    } catch (error) {
      next(error);
    }
  })

module.exports = router