const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;
const bodyParser = require("body-parser");
const pool = require("./database/database")
const chalk = require('chalk')
const contatoRouter = require("./routes/contatoRouter")
const contatosController = require('./controllers/ContatosController')
const consign = require("consign")
const ContatosModel = require('./models/contatos/ContatosModel')
require('dotenv').config();
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport')
const initializePassport = require('./config/passportConfig')
const {eAdmin} = require('./helpers/eAdmin')
const loginRouter = require('./routes/loginRouter')
const userController = require('./controllers/userController')
const userRouter = require("./routes/userRouter")
// app.use((req,res,next)=>{
//     res.locals.user =req.user 
// })


var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
initializePassport(passport);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.set('view engine', 'ejs')
app.use(express.static('public'));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 }//30min
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

app.use('/',loginRouter)
app.use('/users',isAuthenticated,loginRouter)
app.use("/contatos",isAuthenticated, contatoRouter)
app.use("/userRouter",isAuthenticated,userRouter)


app.listen(PORT, function (req, res) {
  console.log(chalk.bgBlue("conectado a porta ", PORT));
})

