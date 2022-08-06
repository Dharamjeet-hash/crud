const express 	    = require('express');
const router        = express.Router();
const auth          = require('../controller/api')
const validation    = require('../validation/api')
const authMiddleware          = require('../middleware/api/auth')

router.post('/register',validation.register_validation,auth.register)

router.post('/login',validation.login_validation,auth.login)

router.get('/user', authMiddleware, auth.user)

router.post('/create-car', validation.create_car, authMiddleware, auth.createCar)

router.get('/get-car/:id',authMiddleware, auth.getCar)

router.get('/users', authMiddleware, auth.users)

module.exports = router