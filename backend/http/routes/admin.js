const express 	            = require('express');
const router                = express.Router();
const adminController       = require('../controller/admin')
const adminValidation       = require('../validations/admin')
const connectEnsureLogin    = require('connect-ensure-login'); //authorization
const passport              = require('passport');  // authentication


router.get('/login',adminController.login)
router.post('/login-submit',passport.authenticate('local', { failureRedirect: '/cadmin/login' }),adminValidation.login_validation,adminController.loginSubmit)
router.get('/users',connectEnsureLogin.ensureLoggedIn(),adminController.users)
router.get('/logout',adminController.logout)

module.exports = router