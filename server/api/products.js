const router = require('express').Router();
const { models: { Product } } = require('../db');

//get all
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await product.findAll({
      attributes: ['prodId']
    })
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

//get single product
// /products/:id
router.get("/:id", async (req, res, next) => {
  try {
      const singleProduct = await Product.findByPk(req.params.id);
      if (!singleProduct) {
        res.status(404).send();
      } else {
        res.status(200).send(singleProduct);
      }
    } catch (error) {
      next(error);
    }
  })

module.exports = router