const userSchema    = require('../../models/userSchema')
const carSchema    = require('../../models/carsSchema')
const bcrypt        = require('bcryptjs');
const jwt           = require("jsonwebtoken");

async function register(req,res){
    const name          = req.body.name
    const email         = req.body.email
    const password      = await bcrypt.hash(req.body.password, 10)
    const user          = await userSchema.register({ username:name, email: email, is_admin:false, active:true}, req.body.password);
    // Create token
    const token = jwt.sign({ user_id: user._id, email },"crud",{expiresIn: "2h"});
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
     const token = jwt.sign({ user_id: user._id, email },"crud",{expiresIn: "2h"});
     // return new user
     res.status(201).json({
         user,
         token
     });

}

async function user(req,res){
    const userCar = await userSchema.findOne({email:req.user.email}).populate('cars')
    res.json(userCar)
}

async function createCar(req,res){
    let {name,brand} = req.body
    let car = await carSchema.create({name,brand})

    let user = await userSchema.findOne({email:req.user.email})
    user.cars.push(car)
    car.user = user
    await user.save()
    await car.save()

    res.json(car)
}

async function getCar(req,res){
    let {id} = req.params
    let car = await carSchema.findById(id)
    res.json(car)
}

async function users(req,res){
    let users = await userSchema.find({is_admin:false,email:{$ne:req.user.email}})
    res.json(users)
}

module.exports = {
    register:register,
    login:login,
    user:user,
    createCar:createCar,
    users:users,
    getCar:getCar
}
