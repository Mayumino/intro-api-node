const db  = require('../dataBase/connection');

module.exports = {
    async listarRotas (request, response) {
        try{

            const sql = `SELECT 
                        rot_id, cli_id, rot_des, rot_dist, rot_data 
                        FROM ROTAS;`;

            const [row] = await db.query(sql);
            const nItens = row.length;


            return response.status(200).json({
                sucesso: true,
                mensagem:'Lista de Rotas.',
                nItens,
                dados: row
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem:'Erro na listagem de rotas.',
                dados: error.message
            });
        }
    },


    async cadastrarRotas(request, response) {
        try {

            const { Idcliente, descricao, distancia, data} = request.body;

            const sql = `INSERT INTO ROTAS 
                            (cli_id, rot_des, rot_dist, rot_data) 
                        VALUES
                            (?, ?, ?, ?);
                        `;

            const values = [Idcliente, descricao, distancia, data];
            const [result] = await db.query(sql, values);

            const dados = {
                Idcliente,
                descricao,
                distancia,
                data
            };
            
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Cadastro de rota concluido.',
                dados: dados
            });
        }
        catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'erro no cadastro de rotas',
                dados: error.message
            });
        }
    },

    async editarRotas(request, response) {
        try {

            const {rot_des, rot_dist, rot_data} = request.body;
            const {id} = request.params;

            const sql = `UPDATE Rotas
                            SET rot_des= ?, rot_dist = ?, rot_data = ?
                        WHERE rot_id = ?;`;

            const values = [rot_des, rot_dist, rot_data, id]
            const [result] = await db.query(sql, values);

            if(result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Rota ${id} não encontrada!`,
                    dados: null
                });
            };

            const dados = {
                id,
                rot_data,
                rot_des,
                rot_dist
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: `Rota ${id} atualizada com sucesso!`,
                dados
            });
        }
        catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar Rota',
                dados: error.message
            });
        }
    },

    async apagarRotas(request, response) {
        try{

            const {id} = request.params;
            const sql = `DELETE FROM Rotas WHERE rot_id = ?`;
            const values = [id];

            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: `Rota ${id} não encontrada!`,
                    dados:null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Rota Apagada com sucessso',
                dados: null,
            });
        }
        catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem:'erro ao apagar rota',
                dados: error.message,
            })

        }
    }




}