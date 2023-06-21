const express = require('express')
const routes = express.Router()

const checkToken = require('./helpers/CheckToken')

const Register = require('./controllers/Register')
const Login = require('./controllers/Login')
const Private = require('./controllers/Private')
const Annotation =  require('./controllers/AnnotationCreate')

routes.post('/register', Register.register)
routes.post('/login', Login.login)
routes.get('/private/:id', checkToken, Private.private)

routes.get('/anottations', Annotation.read)
routes.post('/annotations', Annotation.create)


module.exports = routes 