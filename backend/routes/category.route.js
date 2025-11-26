const express = require('express')
const router = express.Router()
const {add,get, update, remove} = require('../controllers/categories.js')


router.get('/',get)
router.post('/add', add)
router.patch('/:id',update)
router.delete('/:id',remove)

module.exports = router