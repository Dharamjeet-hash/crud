const {check, validationResult} 			= require("express-validator");
var path 									= require('path');
var appDir 									= path.dirname(require.main.filename);
const UserSchema 							= require('../../models/userSchema')



/*for sign up*/
function login(req, res){
	res.render('auth/login',{title:'Login - Pindrop Stories',layout: '../views/layout/auth',errors:'',req:req});
}

async function loginSubmit(req, res){

	if(req.body.errors!=undefined){
		res.render('auth/login',{title:'Login - Pindrop Stories',layout:'../views/layout/auth',errors:req.body.errors,req:req});
		return false;
	}

	res.redirect('/users');
}

async function users(req,res){
	res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
	and your session expires in ${req.session.cookie.maxAge} 
	milliseconds.<br><br>
	<a href="/logout">Log Out</a><br><br>
	<a href="/secret">Members Only</a>`);
}

async function logout(req,res){
	req.logout();
  	res.redirect('/admin/login');
}

module.exports = {
    login  		: login,
	loginSubmit : loginSubmit,
	users		: users,
	logout		: logout
}