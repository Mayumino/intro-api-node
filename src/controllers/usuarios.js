const db = require('../database/connection');

module.exports = {
   async listarUsuarios(request, response) {
      try {


         const sql = `
         SELECT
            usu_id, emp_id, usu_nome, usu_email, usu_senha 
         FROM USUARIOS`;

              const [row] =await db.query(sql);
         const nItens = row.length;
              

         return response.status(200).json({

            sucesso: true,
            mensagem: 'lista de usuarios',
            dados: null,
            nItens,
            dados: row


         })
      }
      catch (error) {
         return response.status(500).json({
            sucesso: false,
            mensagem: 'erro na listagem de usuario',
            dados: error.message
         })
      }
   },



   async cadastrarUsuarios(request, response) {
      try {
         const { emp_id, usu_nome, usu_email, usu_senha } = request.body;
   
        
         if (!emp_id || !usu_nome || !usu_email || !usu_senha) {
            return response.status(400).json({
               sucesso: false,
               mensagem: 'Campos obrigatórios ausentes: emp_id, usu_nome, usu_email, usu_senha',
               dados: null
            });
         }
   
        
         const sql = `
            INSERT INTO USUARIOS (emp_id, usu_nome, usu_email, usu_senha)
            VALUES (?, ?, ?, ?)
         `;
   
         
         const values = [emp_id, usu_nome, usu_email, usu_senha];
   
        
         const [result] = await db.query(sql, values);
   
         
         const dados = {
            id: result.insertId,
            emp_id,
            usu_nome,
            usu_email,
            usu_senha  
         };
   
         return response.status(201).json({
            sucesso: true,
            mensagem: 'Usuário cadastrado com sucesso',
            dados
         });
      } catch (error) {
         return response.status(500).json({
            sucesso: false,
            mensagem: 'Erro no cadastro do usuário',
            dados: error.message
         });
      }
   },



   async editarUsuarios(request, response) {
      try {
        const { emp_id, usu_nome, usu_email, usu_senha } = request.body;
        const { id } = request.params;
    
        const sql = `
          UPDATE usuarios
          SET emp_id = ?, usu_nome = ?, usu_email = ?, usu_senha = ?
          WHERE usu_id = ?;
        `;
    
        const values = [emp_id, usu_nome, usu_email, usu_senha, id];
        const [result] = await db.query(sql, values);
    
        if (result.affectedRows === 0) {
          return response.status(404).json({
            sucesso: false,
            mensagem: `Usuário ${id} não encontrado`,
            dados: null,
          });
        }
    
        const dados = {
          id,
          emp_id,
          usu_nome,
          usu_email
          
        };
    
        return response.status(200).json({
          sucesso: true,
          mensagem: 'Usuário editado com sucesso',
          dados
        });
      } catch (error) {
        return response.status(500).json({
          sucesso: false,
          mensagem: 'Erro ao editar usuário',
          dados: error.message
        });
      }
    },




    async apagarUsuarios(request, response) {
      try {
        const { id } = request.params;
    
        const sql = `DELETE FROM usuarios WHERE usu_id = ?`;
    
        const values = [id]; 
    
        const [result] = await db.query(sql, values);
    
        if (result.affectedRows === 0) {
          return response.status(404).json({
            sucesso: false,
            mensagem: `Usuário ${id} não encontrado`,
            dados: null
          });
        }
    
        return response.status(200).json({
          sucesso: true,
          mensagem: `Usuário ${id} apagado com sucesso`,
          dados: null,
        });
      } 
      
      
      catch (error) {
        return response.status(500).json({
          sucesso: false,
          mensagem: 'Erro ao apagar usuário',
          dados: error.message
        });
      }
    }
    
}