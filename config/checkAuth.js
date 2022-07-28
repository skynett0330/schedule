const flash = require('express-flash')

errors = []


//funcionando
exports.isAdmin = async (req, res, next) => {
    if (req.user.profile ==='admin') {
        next();
    }else{
  res.status(401).json("Você deve ser ADMIN!")
   
}
}
exports.IsUser = async (req, res, next) => {
    if (req.user.user_type_id === "user") {
        next();
    }else{
    return res.status(401).send("Unauthorized!");
    }
}