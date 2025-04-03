const express = require('express')
const router = express.Router();

const categoriasController= require ('../controllers/categorias');
const produtosController= require('../controllers/produtos')
const ped_produtosController= require('../controllers/ped_produtos')

router.get('/categorias', categoriasController.listarCategorias);
router.post('/categorias', categoriasController.cadastrarCategoria);
router.patch('/categorias', categoriasController.editarCategoria);
router.delete('/categorias', categoriasController.apagarCategoria);

router.get('/produtos', produtosController.listarProdutos);
router.post('/produtos', produtosController.cadastrarProdutos);
router.patch('/produtos', produtosController.editarProdutos);
router.delete('/produtos', produtosController.apagarProdutos);

router.get('/ped_produtos', ped_produtosController.listarPed_produtos);
router.post('/ped_produtos', ped_produtosController.cadastrarPed_produtos);
router.patch('/ped_produtos', ped_produtosController.editarPed_produtos);
router.delete('/ped_produtos', ped_produtosController.apagarPed_produtos);


module.exports = router;