const express = require("express");
const pool = require("../database/database");
const router = express.Router();
const flash = require("express-flash");
const ContatosModel = require("../models/contatos/ContatosModel");
const loginModel = require("../models/loginModel/loginModel");

const contatosController = {
  allContatos: function (req, res) {
ContatosModel.getContatos(function(error,results){
if(error){
  throw error
}else{
  console.log(results)
}
})


  },
  getMatricula: async function (req, res) {
    let matricula = req.body

   await ContatosModel.getMatricula(matricula, function (err, results) {
      if (err) {
        throw err;
      } else {
        res.render("pages/contatosId",{
          datas:results.rows
        })
      
        // res.render("pages/contatosId", {
        //   datas: results.rows,
        // });
      }
    });
  },

  index: function (req, res) {
    res.render("index/index", {
      user: req.user.name,
      isAdmin: req.user.profile,
    });
  },

  //TRAZ TODO MUNDO DO BANCO NA LISTA
  getAllEv: async function (req, res) {
   await ContatosModel.getAllEv(function (err, results) {
      if (err) {
        throw err;
      } else {
        res.render("pages/agendamentos", { dados: results.rows });
      }
    });
  },
  salvarContatos: function (req, res) {
    ContatosModel.insertEv(req.body, function (err, results) {
      if (err) {
        throw err;
      } else {
        req.flash("success_msg", "Adcionado com sucesso!");
        res.redirect("/contatos/getAllEv");
        console.log("inserido com sucesso");
      }
    });
  },
  deletOneEv: function (req, res) {
    let id = req.params.id;
    ContatosModel.deletOneEv(id, function (err, results) {
      if (err) {
        throw err;
      } else {
        if (results.rows.length >= 0) {
          req.flash("success_msg", "deletado!");
          res.redirect("/contatos/getAllEv");
        } else {
          res.status(404).json("erro ao deletar");
        }
      }
    });
  },
  editar: async function (req, res) {
    let id = req.params.id;
    let body = req.body;
    ContatosModel.editar(id, body, function (err, results) {
      if (err) {
        throw new err();
      } else {
        req.flash("success_msg", "Editado com sucesso!");
        res.redirect("/contatos/getAllEv");
      }
    });
  },
  getIdContatos: async function (req, res) {
    let id = req.params.id;
    await ContatosModel.getIdContatos(id, function (err, results) {
      if (err) {
        throw err;
      } else {
        res.render("modal/editContato", { datas: results.rows });
      }
    });
  },

  getUserRegister: async function (req, res) {
    let mat = req.body;
    errors = [];

    if (mat == "") {
      errors.push({ message: "digite a matricula" });
      res.render("login/register", { errors });
    } else {
      ContatosModel.getOne(mat, function (err, results) {
        if (err) {
          throw err;
        } else {
          res.render("login/register", { dados: results.rows });
        }
      });
    }
  },
  addListBpm: function (req, res, next) {
    ContatosModel.insertList(req.body, function (err, results) {
      if (err) {
        throw err;
      } else {
        console.log(results.rows);
      }
    });
  },
  getTelFunc: function (req, res) {
    res.render("pages/telFunc");
  },
  queryContatos:function(req,res){
    let matricula = req.body.matricula
    ContatosModel.getIdContatos(matricula,function(err,results){
      if(err){
        throw err
      }else{
        console.log(results)
      }
    })
  }
};
module.exports = contatosController;
