const express = require('express')
const categoryRouter = require('../routes/category.route.js')

const app = express()

app.use(express.json())

app.use('/api/v1/categories', categoryRouter)

module.exports= app