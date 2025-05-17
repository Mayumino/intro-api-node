const db = require('../database/connection');

module.exports = {
   async listarEmpresas(request, response) {
      try {


         const sql = `
         SELECT
            emp_id, emp_nome, emp_cnpj, emp_cel, emp_end 
         FROM EMPRESA`;

         const [row] =await db.query(sql);
         const nItens = row.length;


         return response.status(200).json({

            sucesso: true,
            mensagem: 'lista de empresas',
            dados: null,
            nItens,
            dados: row,

         })
      }
      catch (error) {
         return response.status(500).json({
            sucesso: false,
            mensagem: 'erro na listagem de empresas',
            dados: error.message
         })
      }
   },




   async cadastrarEmpresas(request, response) {
      try {
         
         const { emp_nome, emp_cnpj, emp_cel, emp_end } = request.body;
   
         
         if (!emp_nome || !emp_cnpj || !emp_cel || !emp_end) {
            return response.status(400).json({
               sucesso: false,
               mensagem: 'Campos obrigatórios ausentes: emp_nome, emp_cnpj, emp_cel, emp_end',
               dados: null
            });
         }
   
        
         const sql = `
            INSERT INTO EMPRESA (emp_nome, emp_cnpj, emp_cel, emp_end)
            VALUES (?, ?, ?, ?)
         `;
   
       
         const values = [emp_nome, emp_cnpj, emp_cel, emp_end];
         
        
         const [result] = await db.query(sql, values);
   
         
         const dados = {
            id: result.insertId,
            emp_nome,
            emp_cnpj,
            emp_cel,
            emp_end
         };
   
         
         return response.status(201).json({
            sucesso: true,
            mensagem: 'Empresa cadastrada com sucesso',
            dados
         });
      } catch (error) {
        
         return response.status(500).json({
            sucesso: false,
            mensagem: 'Erro no cadastro da empresa',
            dados: error.message
         });
      }
   },
   




   async editarEmpresas(request, response) {
      try {
        const { emp_nome, emp_cnpj, emp_cel, emp_end } = request.body;
        const { id } = request.params;
    
        const sql = `
          UPDATE empresa 
          SET emp_nome = ?, emp_cnpj = ?, emp_cel = ?, emp_end = ?
          WHERE 
          emp_id = ?;
        `;
    
        const values = [emp_nome, emp_cnpj, emp_cel, emp_end, id];
        const [result] = await db.query(sql, values);
    
        if (result.affectedRows === 0) {
          return response.status(404).json({
            sucesso: false,
            mensagem: `Empresa ${id} não encontrada`,
            dados: null,
          });
        }
    
        const dados = {
          id,
          emp_nome,
          emp_cnpj,
          emp_cel,
          emp_end,
        };
    
        return response.status(200).json({
          sucesso: true,
          mensagem: 'Empresa editada com sucesso',
          dados,
        });
      } catch (error) {
        return response.status(500).json({
          sucesso: false,
          mensagem: 'Erro ao editar empresa',
          dados: error.message,
        });
      }
    }
    ,




    async apagarEmpresas(request, response) {
      try {
        const { id } = request.params;
    
        const sql = `DELETE FROM empresa WHERE emp_id = ?`;
        const values = [id]; 
    
        const [result] = await db.query(sql, values);
    
        if (result.affectedRows === 0) {
          return response.status(404).json({
            sucesso: false,
            mensagem: `Empresa ${id} não encontrada`,
            dados: null
          });
        }
    
        return response.status(200).json({
          sucesso: true,
          mensagem: `Empresa ${id} excluída com sucesso`,
          dados: null
        });
    
      } catch (error) {
        return response.status(500).json({
          sucesso: false,
          mensagem: 'Erro ao apagar empresa',
          dados: error.message
        });
      }
    }
   }