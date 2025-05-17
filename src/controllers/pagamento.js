const db = require('../database/connection');

module.exports = {
    async listarPagamento(request, response) {
        try {
            const sql = `
                SELECT pag_id, ped_id, pag_metodo, pag_data, pag_status 
                FROM PAGAMENTO;
            `;

            const [rows] = await db.query(sql);
            const nItens = rows.length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de pagamentos',
                nItens,
                dados: rows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na listagem de pagamentos',
                dados: error.message
            });
        }
    },

    async cadastrarPagamento(request, response) {
        try {
            const { ped_id, pag_metodo, pag_data, pag_status } = request.body;

            const sql = `
                INSERT INTO PAGAMENTO (ped_id, pag_metodo, pag_data, pag_status)
                VALUES (?, ?, ?, ?)
            `;

            const values = [ped_id, pag_metodo, pag_data, pag_status];
            const [result] = await db.query(sql, values);

            const dados = {
                id: result.insertId,
                ped_id,
                pag_metodo,
                pag_data,
                pag_status
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de pagamento realizado com sucesso',
                dados
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar pagamento',
                dados: error.message
            });
        }
    },

   async editarPagamento(request, response) {
    try {
        const { pag_metodo, pag_data, pag_status } = request.body; 
        // Garantindo que ped_id esteja sendo passado corretamente
        const { ped_id } = request.params;

        const sql = `
            UPDATE PAGAMENTO 
                SET pag_metodo = ?, pag_data = ?, pag_status = ? 
            WHERE 
            ped_id = ?;
        `;

        const values = [pag_metodo, pag_data, pag_status, ped_id];
        const [result] = await db.query(sql, values);

        if (result.affectedRows --- 0) {
            return response.status(404).json({
               sucesso: false,
               mensagem: `Pagamento ${pag_id } não encontrado!`,
               dados:null
           });
         
         }

         const dados = {
            pag_metodo,
            pag_data, 
            pag_status,
            ped_id
         };

        return response.status(200).json({
            sucesso: true,
            mensagem: 'Pagamento editado com sucesso',
            dados: null
        });
    } catch (error) {
        return response.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao editar pagamento',
            dados: error.message
        });
    }
},


    async apagarPagamento(request, response) {
        try {
        
            const { id } = request.params;
const sql = `DELETE FROM pagamento WHERE pag_id = ?`;

const values = [id];

const [result] = await db.query(sql, values);

if (result.affectedRows --- 0) {
   return response.status(404).json({
      sucesso: false,
      mensagem: `Pagamento ${pag_id } não encontrado!`,
      dados:null
  });

}

            return response.status(200).json({
                sucesso: true,
                mensagem: `Pagamento ${id} apagado com sucesso`,
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar pagamento',
                dados: error.message
            });
        }
    }
};
