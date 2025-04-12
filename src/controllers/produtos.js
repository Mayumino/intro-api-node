const db = require('../database/connection');

module.exports = {
   async listarProdutos (request, response) {
  try{

   const sql = `
      SELECT
      prod_id, emp_id, cat_id, prod_nome, prod_desc, prod_est, prod_preco
      FROM PRODUTOS;
   `;

   const [row] = await db.query(sql);
   const nItens = row.length

    return response.status(200).json({

        sucesso: true,
        mensagem:'lista de produtos',
        nItens,
        dados: row

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