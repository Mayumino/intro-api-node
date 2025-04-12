const db = require('../database/connection');

module.exports = {
   async listarCategorias (request, response) {
  try{

   const sql = `
      SELECT
      cat_id, cat_nome, cat_desc
      FROM CATEGORIA;
   `;

   const [row] = await db.query(sql);
   const nItens = row.length
   
    return response.status(200).json({

        sucesso: true,
        mensagem:'lista de categorias',
        nItens,
        dados: row

     })
      }

     catch (error){
         
     return response.status(500).json({

        sucesso: false,
        mensagem:'erro na listagem de categorias',
        dados: error.message
     })

     }

    },


   async cadastrarCategoria (request, response) {
  try{
    return response.status(200).json({

        sucesso: true,
        mensagem:'cadastro de categoria',
        dados: null

     })
      }

     catch (error){
         
     return response.status(500).json({

        sucesso: false,
        mensagem:'erro no cadastro de categoria',
        dados: error.message
     })

     }

    },


   async editarCategoria (request, response) {
  try{
    return response.status(200).json({

        sucesso: true,
        mensagem:'editar categoria',
        dados: null

     })
      }

     catch (error){
         
     return response.status(500).json({

        sucesso: false,
        mensagem:'erro na na edição da categoria',
        dados: error.message
     })

     }

    },


   async apagarCategoria (request, response) {
  try{
    return response.status(200).json({

        sucesso: true,
        mensagem:'apagar categoria',
        dados: null

     })
      }

     catch (error){
         
     return response.status(500).json({

        sucesso: false,
        mensagem:'erro em apagar o categoria',
        dados: error.message
     })

     }

    },

}