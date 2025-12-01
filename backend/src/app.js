const express = require('express')
const categoryRouter = require('../routes/category.route.js')
const productRouter = require('../routes/product.route.js')
const userRouter = require('../routes/user.route.js')
const app = express()

app.use(express.json())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/products',productRouter)

module.exports= app