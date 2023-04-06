const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.send(allProducts);
  } catch (err) {
    next(err);
  }
});

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
});

router.put("/:id", async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id);
    await singleProduct.update(req.body);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const prodId = req.params.id;
    const product = await Product.findByPk(prodId);

    if (!product) {
      res.status(404).send();
    } else {
      await product.destroy();
      res.status(204).send();
    }
  } catch (error) {
    if (isNaN(req.params.id)) {
      res.status(400).send();
    } else {
      next(error);
    }
  }
});

router.post("/", async (req, res, next) => {
  try {
    const [product, created] = await Product.findOrCreate({
      where: {
        prodName: req.body.prodName,
        prodQuantity: req.body.prodQuantity,
        prodPrice: req.body.prodPrice,
        prodSize: req.body.prodSize,
        prodColor: req.body.prodColor,
        prodImg: req.body.prodImg,
      },
    });
    if (created) {
      res.status(201).send(product);
    } else {
      res.status(409).send();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
