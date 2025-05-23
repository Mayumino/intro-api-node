const express = require('express')
const router = express.Router();

const categoriasController= require ('../controllers/categorias');
const produtosController= require('../controllers/produtos')
const ped_produtosController= require('../controllers/pedido_produto')

router.get('/categorias', categoriasController.listarCategorias);
router.post('/categorias', categoriasController.cadastrarCategoria);
router.patch('/categorias/:id', categoriasController.editarCategoria);
router.delete('/categorias/id', categoriasController.apagarCategoria);

router.get('/produtos', produtosController.listarProdutos);
router.post('/produtos', produtosController.cadastrarProdutos);
router.patch('/produtos/:id', produtosController.editarProdutos);
router.delete('/produtos/id', produtosController.apagarProdutos);

router.get('/pedido_produto', ped_produtosController.listarPedido_produto);
router.post('/pedido_produto', ped_produtosController.cadastrarPedido_produto);
router.patch('/pedido_produto/:id', ped_produtosController.editarPedido_produto);
router.delete('/pedido_produto/id', ped_produtosController.apagarPedido_produto);


module.exports = router;