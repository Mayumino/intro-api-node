const db = require('../database/connection');

module.exports = {
   async listarProdutos (request, response) {
  try{
    return response.status(200).json({

        sucesso: true,
        mensagem:'lista de produtos',
        dados: null

     })
      }

     catch (error){
         
     return response.status(500).json({

        sucesso: false,
        mensagem:'erro na listagem de produtos',
        dados: error.message
     })

     }

    },


   async cadastrarProdutos (request, response) {
  try{
    return response.status(200).json({

        sucesso: true,
        mensagem:'Cadastro de Produto',
        dados: null

     })
      }

     catch (error){
         
     return response.status(500).json({

        sucesso: false,
        mensagem:'erro no cadastro do produto',
        dados: error.message
     })

     }

    },


   async editarProdutos (request, response) {
  try{
    return response.status(200).json({

        sucesso: true,
        mensagem:'editar produto',
        dados: null

     })
      }

     catch (error){
         
     return response.status(500).json({

        sucesso: false,
        mensagem:'erro na na edição do produto',
        dados: error.message
     })

     }

    },


   async apagarProdutos (request, response) {
  try{
    return response.status(200).json({

        sucesso: true,
        mensagem:'apagar produto',
        dados: null

     })
      }

     catch (error){
         
     return response.status(500).json({

        sucesso: false,
        mensagem:'erro em apagar o produto',
        dados: error.message
     })

     }

    },

}