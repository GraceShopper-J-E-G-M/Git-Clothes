const router = require('express').Router();
const { models: { Product } } = require('../db');

//get all
// /allProducts
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.send(allProducts);
  } catch (err) {
    next(err)
  }
})

//get single product
// /allProducts/${id}
router.get('/:id', async (req, res, next) => {
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

//edit single product
router.put("/:id", async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id);
    await singleProduct.update(req.body);
    res.status(204).send();
  } catch (error) {
    next(error)
  }
})

module.exports = router