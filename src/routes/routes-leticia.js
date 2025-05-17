const express = require('express')
const router = express.Router();

const contatosController= require ('../controllers/contatos');
const usuariosController= require ('../controllers/usuarios');
const empresaController= require ('../controllers/empresa');

router.get('/contatos', contatosController.listarContatos);
router.post('/contatos', contatosController.cadastrarContatos);
router.patch('/contatos/:id', contatosController.editarContatos);
router.delete('/contatos/:id', contatosController.apagarContatos);

router.get('/usuarios', usuariosController.listarUsuarios);
router.post('/usuarios', usuariosController.cadastrarUsuarios);
router.patch('/usuarios/:id', usuariosController.editarUsuarios);
router.delete('/usuarios/:id', usuariosController.apagarUsuarios);

router.get('/empresa', empresaController.listarEmpresas);
router.post('/empresa', empresaController.cadastrarEmpresas);
router.patch('/empresa/:id', empresaController.editarEmpresas);
router.delete('/empresa/:id', empresaController.apagarEmpresas);


module.exports = router;