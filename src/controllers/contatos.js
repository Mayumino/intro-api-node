const db = require('../database/connection');

module.exports = {
   async listarContatos(request, response) {

      try {


         const sql = `
         SELECT
            cont_id, emp_id, cont_tipo, cont_desc 
         FROM CONTATO`

         const [row] =await db.query(sql);
         const nItens = row.length;


         return response.status(200).json({

            sucesso: true,
            mensagem: 'lista de contatos',
            dados: null,
            nItens,
            dados: row

         })
      }
      catch (error) {
         return response.status(500).json({
            sucesso: false,
            mensagem: 'erro na listagem de Contato',
            dados: error.message
         })
      }
   },




   async cadastrarContatos(request, response) {
      try {
         const { emp_id, cont_tipo, cont_desc } = request.body;
   
        
         if (!emp_id || !cont_tipo || !cont_desc) {
            return response.status(400).json({
               sucesso: false,
               mensagem: 'Campos obrigatórios ausentes: emp_id, cont_tipo, cont_desc',
               dados: null
            });
         }
   
         const sql = `
            INSERT INTO CONTATO (emp_id, cont_tipo, cont_desc)
            VALUES (?, ?, ?)
         `;
   
         const values = [emp_id, cont_tipo, cont_desc];
         const [result] = await db.query(sql, values);
   
         const dados = {
            id: result.insertId,
            emp_id,
            cont_tipo,
            cont_desc
         };
   
         return response.status(201).json({
            sucesso: true,
            mensagem: 'Contato cadastrado com sucesso',
            dados
         });
      } catch (error) {
         return response.status(500).json({
            sucesso: false,
            mensagem: 'Erro no cadastro de Contato',
            dados: error.message
         })
      }
   },




   async editarContatos(request, response) {
      try {
        const { emp_id, cont_tipo, cont_desc } = request.body;
        const { id } = request.params;
    
        const sql = `
          UPDATE contato
          SET emp_id = ?, cont_tipo = ?, cont_desc = ?
          WHERE cont_id = ?;
        `;
    
        const values = [emp_id, cont_tipo, cont_desc, id];
        const [result] = await db.query(sql, values);
    
        if (result.affectedRows === 0) {
          return response.status(404).json({
            sucesso: false,
            mensagem: `Contato ${id} não encontrado`,
            dados: null,
          });
        }
    
        const dados = {
          id,
          emp_id,
          cont_tipo,
          cont_desc,
        };
    
        return response.status(200).json({
          sucesso: true,
          mensagem: 'Contato editado com sucesso',
          dados,
        });
      } catch (error) {
        return response.status(500).json({
          sucesso: false,
          mensagem: 'Erro ao editar contato',
          dados: error.message,
        });
      }
    },
    




   async apagarContatos(request, response) {
      try {


         const { id } = request.params;
    
         const sql = `DELETE FROM contato WHERE cont_id = ?`;
         const values = [id]; 
     
         const [result] = await db.query(sql, values);
     
         if (result.affectedRows === 0) {
           return response.status(404).json({
             sucesso: false,
             mensagem: `Contato ${id} não encontrado`,
             dados: null
           });
         }

         return response.status(200).json({

            sucesso: true,
            mensagem: `Contato ${id} apagado`,
            dados: null

         })
      }
      catch (error) {
         return response.status(500).json({
            sucesso: false,
            mensagem: 'erro ao apagar contato',
            dados: error.message
         })
      }
   },
}