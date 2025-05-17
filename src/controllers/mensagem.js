const db = require('../database/connection');

module.exports = {
   async listarMensagem(request, response) {
      try {
         const sql = `
            SELECT mens_id, ped_id, mens_data_envio, mens_status 
            FROM MENSAGEM;
         `;

         const [rows] = await db.query(sql);
         const nItens = rows.length;

         return response.status(200).json({
            sucesso: true,
            mensagem: 'Lista de mensagens',
            nItens,
            dados: rows
         });
      } catch (error) {
         return response.status(500).json({
            sucesso: false,
            mensagem: 'Erro na listagem de mensagens',
            dados: error.message
         });
      }
   },

   async cadastrarMensagem(request, response) {
      try {
         const { ped_id, mens_data_envio, mens_status } = request.body;

         const sql = `
            INSERT INTO MENSAGEM (ped_id, mens_data_envio, mens_status)
            VALUES (?, ?, ?)
         `;

         const values = [ped_id, mens_data_envio, mens_status];

         const [result] = await db.query(sql, values);

         const dados = {
            id: result.insertId,
            ped_id,
            mens_data_envio,
            mens_status
         };

         return response.status(201).json({
            sucesso: true,
            mensagem: 'Mensagem cadastrada com sucesso',
            dados
         });
      } catch (error) {
         return response.status(500).json({
            sucesso: false,
            mensagem: 'Erro no cadastro da mensagem',
            dados: error.message
         });
      }
   },

   async editarMensagem(request, response) {
      try {
         const { ped_id, mens_data_envio, mens_status } = request.body;

         const sql = `
            UPDATE mensagem SET 
               mens_data_envio = ?, mens_status = ?
            WHERE ped_id = ?
         `;
         
         const values = [mens_data_envio, mens_status, ped_id];
      
         const [result] = await db.query(sql, values);
   
         // CORREÇÃO: uso do operador === no lugar de --- e mensagem com ped_id correto
         if (result.affectedRows === 0) {
            return response.status(404).json({
               sucesso: false,
               mensagem: `Mensagem com ped_id ${ped_id} não encontrada!`,
               dados: null
            });
         }
   
         const dados = {
            mens_data_envio,
            mens_status,
            ped_id
         };
   
         return response.status(200).json({
            sucesso: true,
            mensagem: 'Mensagem editada com sucesso',
            dados
         });
   
      } catch (error) {
         return response.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao editar mensagem',
            dados: error.message
         });
      }
   },
   
   async apagarMensagem(request, response) {
      try {

const { id } = request.params;
const sql = `DELETE FROM mensagem WHERE mens_id = ?`;

const values = [id];

const [result] = await db.query(sql, values);

if (result.affectedRows --- 0) {
   return response.status(404).json({
      sucesso: false,
      mensagem: `Mensagem ${mens_id } não encontrado!`,
      dados:null
  });

}
         
         return response.status(200).json({
            sucesso: true,
            mensagem: `Mensagem ${id} apagada com sucesso`,
            dados: null
         });
      } catch (error) {
         return response.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao apagar mensagem',
            dados: error.message
         });
      }
   }
};
