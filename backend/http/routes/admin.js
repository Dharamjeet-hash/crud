const express 	            = require('express');
const router                = express.Router();
const adminController       = require('../controller/admin')
const adminValidation       = require('../validation/admin')
const connectEnsureLogin    = require('connect-ensure-login'); //authorization
const passport              = require('passport');  // authentication
const adminMiddleware       = require('../middleware/admin/admin')
const guestMiddleware       = require('../middleware/admin/guest')

router.get('/',function(req,res){
    res.redirect('/admin/login');
})
router.get('/login',guestMiddleware,adminController.login)

router.post('/login-submit',passport.authenticate('custom', { failureRedirect: '/admin/login',successRedirect:'/admin/users' }),adminController.loginSubmit)

router.get('/count-cars',connectEnsureLogin.ensureLoggedIn('/admin/login'),adminController.countCars)

router.get('/users',connectEnsureLogin.ensureLoggedIn('/admin/login'),adminMiddleware,adminController.users)

router.get('/call-three-functions',connectEnsureLogin.ensureLoggedIn('/admin/login'),adminMiddleware,adminController.callThreeFunctions)

router.get('/logout',adminController.logout)

module.exports = router