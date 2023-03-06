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

//delete single product
router.delete("/:id", async (req, res, next) => {
  try {
    const prodId = req.params.id;
    const product = await Product.findByPk(prodId);

    if (!product) {
      res.status(404).send();
    } else {
      const removeProduct = await Product.destroy({
        where: {
          prodId,
        }
      })
      res.status(204).send();
    }
  } catch (error) {
    if (isNaN(req.params.id)) {
      res.status(400).send();
    } else {
      next(error);
    }
  }
})

//add new single product
router.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.send(newProduct);
  } catch (err) {
    next(err);
  }
})

module.exports = router