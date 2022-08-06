const admin = (req,res,next)=>{
    if(req.user.is_admin != true){
        req.session.destroy( function ( err ) {
            return res.redirect('/admin/login');
        });
    }

    return next()
}

module.exports = admin