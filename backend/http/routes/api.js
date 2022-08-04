const express 	    = require('express');
const router        = express.Router();
const auth          = require('../controller/api')
const validation    = require('../validation/api')

router.post('/register',validation.register_validation,auth.register)
router.post('/login',validation.login_validation,auth.login)

module.exports = router