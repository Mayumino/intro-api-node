const db = require('../database/connection');

module.exports = {
   async listarPedido_produto (request, response) {
  try{

   const sql = `
      SELECT
      pedpro_id, pedpro_preco_unit, pedpro_quant
      FROM Pedido_produto
   `;

   const [row] = await db.query(sql);
   const nItens = row.length

    return response.status(200).json({

        sucesso: true,
        mensagem:'lista de produtos pedidos',
        nItens,
        dados: row
      })
   
   } catch (error){
         
     return response.status(500).json({

        sucesso: false,
        mensagem:'erro na listagem de produtos pedidos',
        dados: error.message
     })

     }

    },


   async cadastrarPedido_produto (request, response) {

   try{

      const {precoPorUnidade, valorDoPedido} = request.body;

      const sql = `
         INSERT INTO pedido_produto
            (pedpro_preco_unit, pedpro_quant)
         VALUES
            (? , ?);
      `
      const values = [precoPorUnidade, valorDoPedido];
      const [result] = await db.query(sql, values);

      const dados = {
        id: result.insertId,
        precoPorUnidade,
        valorDoPedido
      };
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


   async editarPedido_produto (request, response) {
  try{
   const {precoPorUnidade, valorDoPedido} = request.body;
   const {id} = request.params;

      const sql = `
         UPDATE pedido_produto SET
         pedpro_preco_unit = ?, pedpro_quant = ?
         WHERE
         pedpro_id = ?
      `;

      const values = [precoPorUnidade, valorDoPedido, id];
      const [result] = await db.query(sql, values);

      if (result.affectedRows === 0) {
         return response.status(404).json({
            sucesso: false,
            mensagem:`Erro ao encontrar o pedido do produto ${id}`,
            dados: null
         });
      }

      const dados = {
         precoPorUnidade,
         valorDoPedido
       };

   return response.status(200).json({
        sucesso: true,
        mensagem: `O pedido do produto ${id} foi atualizado com sucesso!`,
        dados
   });

   } catch (error) {
      return response.status(500).json({
         sucesso: false,
           mensagem:`Erro ao atualizar o pedido do produto ${id}.`,
           dados: error.message
      })

   }

},


   async apagarPedido_produto (request, response) {
      try{
         const {id} = request.params;
         const sql = `DELETE FROM pedido_produto WHERE pedpro_id = ?`;
         const values = [id];
         const [result] = await db.query(sql, values);

         if (result.affectedRows === 0) {
            return response.status(404).json({
               sucesso: false,
               mensagem:`Erro ao deletar o pedido do produto ${id}`,
               dados: null
            });
         }

         return response.status(200).json({
            sucesso: true,
            mensagem:`O pedido do produto ${id} foi deletado com sucesso!`,
            dados: null
         });
      
      } catch (error){
         return response.status(500).json({
          sucesso: false,
          mensagem:`Erro ao deletar o pedido do produto ${id}.`,
          dados: error.message
         });
      }

   },


}