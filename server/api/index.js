const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

router.get('/', async (req, res, next) => {
  try {
    const products = await products.findAll({
      attributes: ['prodId']
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})