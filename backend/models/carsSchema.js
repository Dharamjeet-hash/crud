const mongoose      = require('mongoose');
const connection    = require('../config/dbconn')
 
const CarSchema = new mongoose.Schema({
    name:String,
    brand:String,
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});


const Car = connection.model('Car', CarSchema);
 
module.exports = Car