const UserSchema = require('../../models/userSchema')

UserSchema.register({ username:'admin', email: 'admin@gmail.com', is_admin:true, active:true}, 'welcome2wis$');





// const seedKpi = {
//     "username": "admin",
//     "email": 'admin@gmail.com',
//     "is_admin":true,
//     "active":true,
//     "password":await bcrypt.hash("welcome2wis$", 10)
// }

// const seedDB = async () =>{
//     await UserSchema.delete()
//     await UserSchema.insert(seedKpi)
// };

// seedDB().then(() => {
//     console.log("Done")
// }).catch((error)=>{
//     console.log(error)
// })