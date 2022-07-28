const express = require("express");
const router = express.Router();
const pool = require("../database/database");
const userController = require("../controllers/userController")
const { IsAdmin, isAdmin,IsUser } = require("../config/checkAuth");

//           users/register

// /


router.get('/userView',userController.userView)
router.post('/register',isAdmin, userController.register)
router.get('/logout', userController.logout)
router.get('/getAll',userController.getAll)
router.get('/delete/:id?',isAdmin,userController.delUser)



module.exports = router