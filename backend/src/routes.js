const express = require('express')
const routes = express.Router()

const checkToken = require('./helpers/CheckToken')

const Register = require('./controllers/Register')
const Login = require('./controllers/Login')
const Private = require('./controllers/Private')

routes.post('/register', Register.register)
routes.post('/login', Login.login)
routes.get('/private/:id', checkToken, Private.private)

module.exports = routes 