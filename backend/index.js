
const express       = require('express');
const bodyParser    = require('body-parser');
const api           = require('./http/routes/api');
const admin         = require('./http/routes/admin');
const port          = 5000;
const app           = express();
const session       = require('express-session');  // session middleware
const passport      = require('passport');  // authentication
const connectEnsureLogin = require('connect-ensure-login'); //authorization
const UserSchema 							= require('./models/userSchema')


app.use(function (req, res, next){
    res.header("Access-Control-Expose-Headers", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    // function of username, password, done(callback)
    function(email, password, done) {
      // look for the user data
      User.findOne({ email: email }, function (err, user) {
        // if there is an error
        if (err) { return done(err); }
        // if user doesn't exist
        if (!user) { return done(null, false, { message: 'User not found.' }); }
        // if the password isn't correct
        if (!user.verifyPassword(password)) { return done(null, false, {   
        message: 'Invalid password.' }); }
        // if the user is properly authenticated
        return done(null, user);
      });
    }
));


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(session({
    secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
  }));


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
  


app.use('/api', api);
app.use('/admin', admin);

app.listen(port, function() {
    console.log("Server is listening at port:" + port);
});