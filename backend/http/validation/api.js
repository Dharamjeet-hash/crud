const express 			    = require('express');
//const 			    = require('').config();
const userSchema        = require('../../models/userSchema')
const bcrypt            = require('bcryptjs');

const { validateResult, ValidationChain, check, validationResult }	= require('express-validator');
// can be reused by many routes
var passRegex = /\d/
// parallel processing
const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const newErrors = {};
    for (let i=0; i<errors.array({ onlyFirstError: true }).length; i++) {
      newErrors[errors.array({ onlyFirstError: true })[i].param] = errors.array({ onlyFirstError: true })[i].msg
    }
    res.status(400).json(newErrors);
  };
};





const register_validation = [

    check('name').not().isEmpty().withMessage('Name is required'),

    check('email')
    .not().isEmpty().withMessage('Email is required')
    .isLength({max: 35}).withMessage('Email must not have more than 35 characters')
    .isEmail().normalizeEmail().withMessage('Not a valid email address')
    .custom(async (value, {req})=>{  
      let user = await userSchema.findOne({email:req.body.email})
      if(Boolean(user)) {
        return Promise.reject('E-mail already in use');
      }
    }),

    check('passwordConfirm').not().isEmpty().withMessage('Password confirmation is required')
    .custom((value, {req}) => (value === req.body.password)).withMessage('Passwords do not match'),
    
    check('password').not().isEmpty().withMessage('Password  is required').isLength({max: 12}).withMessage('Password should contain maxium 12  characters')
    .isLength({min:8}).withMessage('Password should contain minimum 8 characters')
    .custom((value) => (value.match(passRegex))).withMessage('Must contain atleast one digit')
    
]


const login_validation = [
     
    check('email').not().isEmpty().withMessage('Email is required')
    .isEmail().normalizeEmail().withMessage('Not a valid email address')
    .custom(async (value, {req})=>{
      let user = await userSchema.findOne({email:req.body.email})
      if(!Boolean(user)) {
        return Promise.reject("Email doesn't exist");
      }
    }),

    check('password')
    .not().isEmpty().withMessage('Password  is required')
    .isLength({max: 12}).withMessage('Password should contain maxium 12  characters')
    .custom(async (value,{req})=>{  
      let user = await userSchema.findOne({email:req.body.email})
      const password = await bcrypt.compare(value,user.password);
      if(!password) {
        return Promise.reject("Invalid password");
      }
    }),

    
]


module.exports = {
  register_validation    : validate(register_validation),
	login_validation 	     : validate(login_validation),
}