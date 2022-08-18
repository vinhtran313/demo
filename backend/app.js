const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
// import cors from 'cors'
const apiRoutes = require('./routes/api');

dotenv.config()
require('./config/sequelize')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
  console.log('fullUrl', fullUrl)
  console.log('req.body', req.body)
  console.log('req.query', req.query)
  console.log('req.params', req.params)
  next()
})

app.use(cors());
// app.use(cors({ credentials: true, origin: process.env.FRONT_DOMAIN }))
// app.use(cors({ credentials: true, origin: '*' }))
// mount api v1 routes
app.use('/api/v1', apiRoutes)

module.exports = app