module.exports={


    //helper que so permite usuarios autenticados
    eAdmin: function(req,res,next){
        if(req.isAuthenticated() && req.user.eAdmin == 1){
            return next()
        }
        req.flash("success_msg","Você precisa ser administrador.")
        res.redirect('/')
    },
    eUser: function(req,res,next){
        if(req.isAuthenticated()){
            return res.redirect('/')
        }
    }


}