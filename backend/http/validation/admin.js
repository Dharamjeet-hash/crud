const express 										= require('express');
var pool                          = require('../../db/conn');
const dotenv							 	      = require('dotenv').config();
const md5 									      = require('md5')
const { validateResult, ValidationChain, check, validationResult }	= require('express-validator');
// can be reused by many routes
var passRegex = /\d/
// parallel processing
const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      delete req.body.errors
      return next();
    }
    const newErrors = {};
    for (let i=0; i<errors.array({ onlyFirstError: true }).length; i++) {
      newErrors[errors.array({ onlyFirstError: true })[i].param] = errors.array({ onlyFirstError: true })[i].msg
    }
    req.body.errors = newErrors
    return next();
  };
};



const login_validation = [
     
    check('email').not().isEmpty().withMessage('This field is required')
    .isEmail().normalizeEmail().withMessage('Not a valid email address')
    .custom(async (value)=>{  
      const query = await pool.query(`SELECT COUNT(*) FROM users WHERE email = '${value}'`)
      //console.log(res)
      if(query['rows'][0]['count']==0){
        return Promise.reject("Email doesn't exist");
      }
    }),

    check('password')
    .not().isEmpty().withMessage('This field is required')
    .isLength({max: 12}).withMessage('Password should contain maxium 8 characters')
    .custom(async (value,{req})=>{ 
      var password = md5(value)
      const query = await pool.query(`SELECT COUNT(*) FROM users WHERE password = '${password}' AND email = '${req.body.email}'`)
      if(query['rows'][0]['count']==0){
        return Promise.reject('Invalid password');
      }
    }),
]

const forget_validation = [
  check('email')
  .not().isEmpty().withMessage('This field is required')
  .isEmail().normalizeEmail().withMessage('Not a valid email address')
  .custom(async (value)=>{  
    const query = await pool.query(`SELECT COUNT(*) FROM users WHERE email = '${value}'`)
    //console.log(res)
    if(query['rows'][0]['count']==0){
      return Promise.reject("Email doesn't exist");
    }
  })
]

const reset_validation = [
    check('password')
    .not().isEmpty().withMessage('This field is required')
    .isLength({max: 12}).withMessage('Password should contain maxium 12 characters'),

    check('confirmPassword')
    .not().isEmpty().withMessage('This field is required')
    .isLength({max: 12}).withMessage('Password should contain maxium 12 characters')
    .custom(async (value,{req})=>{
      if(req.body.password !== value){
        return Promise.reject("Password doesn't match");
      }
    })
]



module.exports = {
	login_validation 	            : validate(login_validation),
  forget_validation             : validate(forget_validation),
  reset_validation              : validate(reset_validation),
}