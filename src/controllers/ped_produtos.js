const db = require('../database/connection');

module.exports = {
   async listarPed_produtos (request, response) {
  try{
    return response.status(200).json({

        sucesso: true,
        mensagem:'lista de produtos pedidos',
        dados: null

     })
      }

     catch (error){
         
     return response.status(500).json({

        sucesso: false,
        mensagem:'erro na listagem de produtos pedidos',
        dados: error.message
     })

     }

    },


   async cadastrarPed_produtos (request, response) {
  try{
    return response.status(200).json({

        sucesso: true,
        mensagem:'Cadastro de pedido de produto',
        dados: null

     })
      }

     catch (error){
         
     return response.status(500).json({

        sucesso: false,
        mensagem:'erro no cadastro de pedido de produto',
        dados: error.message
     })

     }

    },


   async editarPed_produtos (request, response) {
  try{
    return response.status(200).json({

        sucesso: true,
        mensagem:'editar pedidos de produto',
        dados: null

     })
      }

     catch (error){
         
     return response.status(500).json({

        sucesso: false,
        mensagem:'erro na na edição de pedidos de produto',
        dados: error.message
     })

     }

    },


   async apagarPed_produtos (request, response) {
  try{
    return response.status(200).json({

        sucesso: true,
        mensagem:'apagar pedido de produto',
        dados: null

     })
      }

     catch (error){
         
     return response.status(500).json({

        sucesso: false,
        mensagem:'erro em apagar pedido de produto',
        dados: error.message
     })

     }

    },

}