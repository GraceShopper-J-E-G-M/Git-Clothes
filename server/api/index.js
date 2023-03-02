const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

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