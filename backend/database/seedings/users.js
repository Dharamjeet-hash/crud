const UserSchema = require('../../models/userSchema')

UserSchema.register({ username:'admin', email: 'admin@gmail.com', is_admin:true, active:true}, 'admin');
