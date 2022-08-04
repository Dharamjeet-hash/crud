const userSchema    = require('../../models/userScehma')
const md5           = require('md5')
const bcrypt        = require('bcryptjs');
const jwt           = require("jsonwebtoken");

async function register(req,res){
    const name          = req.body.name
    const email         = req.body.email
    const password      = await bcrypt.hash(req.body.password, 10)
    const user          = await userSchema.create({
                                name,
                                email: email.toLowerCase(), // sanitize: convert email to lowercase
                                password: password,
                            });

    // Create token
    const token = jwt.sign({ user_id: user._id, email },"kpi",{expiresIn: "2h"});

  
    // return new user
    res.status(201).json({
        user,
        token
    });
}

async function login(req,res){
    let email       = req.body.email
    let user        = await userSchema.findOne({ email });


     // Create token
     const token = jwt.sign({ user_id: user._id, email },"kpi",{expiresIn: "2h"});

  
     // return new user
     res.status(201).json({
         user,
         token
     });

}

module.exports = {
    register:register,
    login:login
}
