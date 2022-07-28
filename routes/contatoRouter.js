const express = require("express");
const router = express.Router();
const pool = require("../database/database");
const contatosController = require('../controllers/ContatosController')
const {eAdmin} = require('../helpers/eAdmin')

//contatos/
router.get('/getAllEv',contatosController.getAllEv)
router.get('/index', contatosController.index)
router.post('/matricula',contatosController.getMatricula)
router.post('/inserir', contatosController.salvarContatos)
router.get('/delete/:id?', contatosController.deletOneEv)
router.post('/editar/:id?',contatosController.editar)
router.get('/getId/:id?',contatosController.getIdContatos)
router.get('/telFunc',contatosController.getTelFunc)
router.post('/getUserRegister',contatosController.getUserRegister)
router.get('/allContatos',contatosController.allContatos)
router.post('/addListBpm',contatosController.addListBpm);
module.exports = router