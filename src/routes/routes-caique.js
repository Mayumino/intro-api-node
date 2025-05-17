const express = require('express')
const router = express.Router();

const mensagemController= require ('../controllers/mensagem');
const pagamentoController= require ('../controllers/pagamento');

router.get('/mensagem', mensagemController.listarMensagem);
router.post('/mensagem', mensagemController.cadastrarMensagem);
router.patch('/mensagem/:id', mensagemController.editarMensagem);
router.delete('/mensagem/:id', mensagemController.apagarMensagem);

router.get('/pagamento', pagamentoController.listarPagamento);
router.post('/pagamento', pagamentoController.cadastrarPagamento);
router.patch('/pagamento/:id', pagamentoController.editarPagamento);
router.delete('/pagamento/:id', pagamentoController.apagarPagamento);

module.exports = router;