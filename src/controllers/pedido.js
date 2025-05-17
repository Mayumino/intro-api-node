const db  = require('../dataBase/connection');

module.exports = {
    async listarPedidos (request, response) {
        try{

            const sql = `
            SELECT 
                ped_id, cli_id, ped_data, ped_status, ped_valor_total 
            FROM PEDIDO;
            `;

            const [row] = await db.query(sql);
            const nItens = row.length;
            
            return response.status(200).json({
                sucesso: true,
                mensagem:'Lista de Pedidos.',
                nItens,
                dados: row
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem:'Erro na listagem de pedidos.',
                dados: error.message
            });
        }
    },


    async cadastrarPedidos(request, response) {
        try {

            const {Idcliente, data_pedido, ped_status, ped_valor} = request.body;

            const sql = `INSERT INTO PEDIDO
                         (cli_id, ped_data, ped_status, ped_valor_total) 
                         VALUES
                         (?, ?, ?, ?);
                    
                        `;

            const values = [Idcliente, data_pedido, ped_status, ped_valor];

            const [result] = await db.query(sql, values);

            const dados = {
                Idcliente,
                data_pedido,
                ped_status,
                ped_valor
            };

            return response.status(200).json({

                sucesso: true,
                mensagem: 'cadastro de pedidos',
                dados: dados
            });
        }
        catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'erro no cadastro de pedidos',
                dados: error.message
            });
        }
    },

    async editarPedidos(request, response) {
        try {

            const {data_pedido, ped_status, ped_valor} = request.body;
            const { id } = request.params;

            const sql = `UPDATE Pedido
                            SET ped_data = ?, ped_status = ?, ped_valor_total = ?
                        WHERE ped_id = ?;
                        `;

            const values = [data_pedido, ped_status, ped_valor, id];
            const [result] = await db.query(sql, values); 

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso:false,
                    mensagem: `Pedido ${id} não encontrado!`,
                    dados: null
                });
            };

            const dados = {
                id,
                data_pedido,
                ped_status,
                ped_valor,
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: `Pedido ${id} atualizado com sucesso!`,
                dados
            });
        }
        catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar pedido',
                dados: error.message
            });
        }
    },

    async apagarPedidos(request, response) {
        try{
            // Paraametro passado via url na chamda da api pelo front-end
            const {id} = request.params;
            // comando de exclusão
            const sql = `DELETE FROM Pedido WHERE ped_id = ?`;
            //array com parametros da exclusão
            const values = [id];
            // executa instrução no banco de dados
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: `Pedido ${id} não encontrado!`,
                    dados:null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Pedido aagado com sucesso!',
                dados: null,
            });
        }
        catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem:'erro ao apagar pedido',
                dados: error.message,
            })

        }
    }




}
