const mongoose      = require('mongoose');
const connection    = require('../config/dbconn')
const passportLocalMongoose = require('passport-local-mongoose');
 
const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    is_admin:{
        type:Boolean,
        default:false
    },
    cars:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Car",
        default:null,
        required: false
    }]
});

User.plugin(passportLocalMongoose);


const User = connection.model('User', UserSchema);
 
module.exports = User