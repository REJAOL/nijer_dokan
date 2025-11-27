const express = require('express')
const { add,get, update,remove } = require('../controllers/products.js')

const router = express.Router()

router.post('/add',add)
router.get('/',get)
router.patch('/:id', update)
router.delete('/:id', remove)

module.exports = router