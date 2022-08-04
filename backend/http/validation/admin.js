const express 										= require('express');
const userSchema                  = require('../../models/userSchema')
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
      const query = await UserSchema.findOne({ email: email })
      if(!query){
        return Promise.reject("Email doesn't exist");
      }
    }),

    check('password')
    .not().isEmpty().withMessage('This field is required')
    .isLength({max: 12}).withMessage('Password should contain maxium 8 characters')
    .custom(async (value,{req})=>{ 
      const user = await userSchema.findOne({email:req.body.email})
      if(!user.verifyPassword(value)){
        return Promise.reject('Invalid password');
      }
    }),
]


module.exports = {
	login_validation 	            : validate(login_validation)
}