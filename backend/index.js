
const express                   = require('express');
const bodyParser                = require('body-parser');
const api                       = require('./http/routes/api');
const admin                     = require('./http/routes/admin');
const port                      = 5000;
const app                       = express();
const session                   = require('express-session');  // session middleware
const passport                  = require('passport');  // authentication
const connectEnsureLogin        = require('connect-ensure-login'); //authorization
const UserSchema 			    = require('./models/userSchema')
var path 				        = require('path');
const expressLayouts 	        = require('express-ejs-layouts')
var appDir 				        = path.dirname(require.main.filename);
var toastr                      = require('express-toastr');
var flash                       = require('connect-flash')
const bcrypt                    = require('bcryptjs');
const LocalStrategy             = require('passport-local').Strategy


app.use(function (req, res, next){
    res.header("Access-Control-Expose-Headers", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});

app.use(expressLayouts)

app.use(session({
    secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

app.use(toastr());
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.use('custom',new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    // function of username, password, done(callback)
    function(req,username,password,done) {
      // look for the user data
      UserSchema.findOne({ email: req.body.email }, async function (err, user) {
        // if there is an error
        if (err) { return done(err); }
        // if user doesn't exist
        if (!user) { return done(null, false, { message: 'User not found.' }); }
        // if the password isn't correct

        const verifiedPassword = await user.authenticate(req.body.password)

        if (!verifiedPassword.user) { return done(null, false, {   
        message: 'Invalid password.' }); }
        // if the user is properly authenticated
        return done(null, user);
      });
    }
));


// passport.use(UserSchema.createStrategy());
passport.serializeUser(UserSchema.serializeUser());
passport.deserializeUser(UserSchema.deserializeUser());


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
  
app.set('views', path.join(appDir, '/http/views'))
app.set('view engine', 'ejs')
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/app-assets', express.static(path.join(__dirname, 'app-assets')));
app.use('/api', api);
app.use('/admin', admin);

let server = app.listen(port, function() {
    console.log("Server is listening at port:" + port);
});

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });
  
  app.set('socketio', io);
  
  global.reciever = {	
  }
  
  io.on('connection', (socket) => {
      socket.on("user_connected", function(data){
        global.reciever[data['email']] = socket.id
      });
  
      socket.on("send_message",function(data){
        let reciever_obj    = {type:'not_mine',message:data.message}
        let sender_obj      = {type:'mine',message:data.message}
        io.to(global.reciever[data.email]).emit("new_message", reciever_obj)
        //io.to(data.socket_id).emit("new_message", sender_obj)
      });
  });