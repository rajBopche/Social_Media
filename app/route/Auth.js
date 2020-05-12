const AuthController = require('../controller/Auth')
const Validators = require('../controller/validators/Auth')
const router = require('express').Router()

router.post('/register', Validators.register, AuthController.register)
    .post('/login', Validators.login, AuthController.login)


module.exports = router