const guest = (req,res,next)=>{
    if(req.user){
        return res.redirect('/admin/users')
    }

    return next()
}

module.exports = guest