const express 	            = require('express');
const router                = express.Router();
const adminController       = require('../controller/admin')
const adminValidation       = require('../validation/admin')
const connectEnsureLogin    = require('connect-ensure-login'); //authorization
const passport              = require('passport');  // authentication

router.get('/',function(req,res){
    res.redirect('/admin/login');
})
router.get('/login',adminController.login)
router.post('/login-submit',passport.authenticate('custom', { failureRedirect: '/admin/login' }),adminController.loginSubmit)
router.get('/users',connectEnsureLogin.ensureLoggedIn('/admin/login'),adminController.users)
router.get('/logout',adminController.logout)

module.exports = router