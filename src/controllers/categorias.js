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

         const {categoriaNome, categoriaDescricao} = request.body;
   
         const sql = `
            INSERT INTO categoria
               (cat_nome, cat_desc)
            VALUES
               (? , ?);
         `
         const values = [categoriaNome, categoriaDescricao];
         const [result] = await db.query(sql, values);
   
         const dados = {
            id: result.insertId,
            categoriaNome,
            categoriaDescricao
         };
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
   const {categoriaNome, categoriaDescricao} = request.body;
   const {id} = request.params;

   const sql = `
   UPDATE categoria SET
      cat_nome = ?, cat_desc = ?
   WHERE
      cat_id = ?
   `

   const values = [categoriaNome, categoriaDescricao, id];
   const [result] = await db.query(sql, values);

   if (result.affectedRows === 0) {
      return response.status(404).json({
         sucesso: false,
         mensagem:`Erro ao encontrar a categoria ${id}`,
         dados: null
      });
   }

   const dados = {
      categoriaNome,
      categoriaDescricao
   };


      return response.status(200).json({
        sucesso: true,
        mensagem:`A categoria ${id} foi atualizada com sucesso!`,
        dados: null
      })

   } catch (error){ 
      return response.status(500).json({
         sucesso: false,
         mensagem:`Erro ao atualizar a categoria ${id}.`,
         dados: error.message
      })
   }

},


   async apagarCategoria (request, response) {
      try{
         const {id} = request.params;
         const sql = `DELETE FROM categoria WHERE cat_id = ?`;
         const values = [id];
         const [result] = await db.query(sql, values);

         if (result.affectedRows === 0) {
            return response.status(404).json({
               sucesso: false,
               mensagem:`Erro ao deletar a categoria ${id}`,
               dados: null
            });
         }

         return response.status(200).json({
            sucesso: true,
            mensagem:`A categoria ${id} foi deletada com sucesso!`,
            dados: null
         });
      
      } catch (error){
         return response.status(500).json({
          sucesso: false,
          mensagem:`Erro ao deletar a categoria ${id}.`,
          dados: error.message
         });
      }

   },

}