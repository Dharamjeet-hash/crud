const {check, validationResult} 			= require("express-validator");
var path 									= require('path');
var appDir 									= path.dirname(require.main.filename);
const UserSchema 							= require('../../models/userSchema')
const carSchema 							= require('../../models/carsSchema')
const commonFunctions 						= require('../common/funtions')



/*for sign up*/
function login(req, res){
	res.render('auth/login',{title:'Login - Pindrop Stories',layout: '../views/layout/auth',errors:'',req:req});
}

async function loginSubmit(req, res){

	if(req.body.errors!=undefined){
		res.render('auth/login',{title:'Login - Pindrop Stories',layout:'../views/layout/auth',errors:req.body.errors,req:req});
		return false;
	}

	res.redirect('/admin/users');
}

async function users(req,res){
	res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
	and your session expires in ${req.session.cookie.maxAge} 
	milliseconds.<br><br>
	<a href="/admin/logout">Log Out</a>
	<br>
	<br>
	<a href="/admin/call-three-functions">Call three function parallel</a>
	<br>
	<br>
	<br>
	<a href="/admin/count-cars">count cars for each user using aggregate</a>
	`);
}

async function countCars(req,res){
	const car = await carSchema.aggregate([
		{ $group : { _id : '$user', totalCars : { $sum : 1 } } }
	  ])
	res.json(car)
}

async function callThreeFunctions(req,res){
	let [sayName, sayAge, saySirName] = await Promise.all([commonFunctions.sayName(), commonFunctions.sayAge(),commonFunctions.saySirName()]);
	res.send(`Hello my name is "${sayName}" and my age is "${sayAge}" and my sir name is "${saySirName}"`);
}

async function logout(req,res){
	req.session.destroy( function ( err ) {
		res.redirect('/admin/login');
	});
}


module.exports = {
    login  				: login,
	loginSubmit 		: loginSubmit,
	users				: users,
	callThreeFunctions 	: callThreeFunctions,
	countCars 			: countCars,
	logout				: logout
}