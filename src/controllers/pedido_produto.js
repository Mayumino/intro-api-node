const db = require('../database/connection');

module.exports = {
   async listarPedido_produto (request, response) {
  try{

   const sql = `
      SELECT
      pedpro_id, prod_id, ped_id, pedpro_preco_unit, pedpro_quant
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


   async apagarPedido_produto (request, response) {
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