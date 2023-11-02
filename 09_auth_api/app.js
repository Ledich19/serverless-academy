const express = require('express')
const authRouter = require('./controllers/auth')
const app = express()

app.use('/', authRouter)

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint'
  })
}
app.use(unknownEndpoint)

module.exports = app