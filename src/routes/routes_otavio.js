const express = require('express');
const router = express.Router();


const RotasController = require('../controllers/rotas');
const CLientesController = require('../controllers/cliente');
const PedidosController = require('../controllers/pedido');

router.get('/rotas', RotasController.listarRotas);
router.post('/rotas', RotasController.cadastrarRotas);
router.patch('/rotas/:id', RotasController.editarRotas);
router.delete('/rotas/:id', RotasController.apagarRotas);

router.get('/cliente', CLientesController.listarClientes);
router.post('/cliente', CLientesController.cadastrarClientes);
router.patch('/cliente/:id', CLientesController.editarClientes);
router.delete('/cliente/:id', CLientesController.apagarClientes);

router.get('/pedido', PedidosController.listarPedidos);
router.post('/pedido', PedidosController.cadastrarPedidos);
router.patch('/pedido/:id', PedidosController.editarPedidos);
router.delete('/pedido/:id', PedidosController.apagarPedidos);

module.exports = router;