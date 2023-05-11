const express = require('express');
const app = express();

const Sequelize = require('sequelize')
const { sequelize } = require('./backend/models/db');
const Medicos = require('./backend/models/Medicos');



app.get("/cadastroMedicos", function(req,res){
  res.sendFile(__dirname +"/frontend/views/cadastroMedicos.html");

})

sequelize.authenticate().then(function() {
  console.log("Conexeão realizada com sucesso")
}).catch(function(err){
  console.log("Erro ao realizar a conexão com banco de dados: " +err)
})


//Add médico na tabela
// Medicos.create({
//   email_medico: "julia@gmail.com",
//   especialidade_medico: "Louco",
//   nome_medico: "Julia",
//   telefone_medico: "9999999",
//   uf_medico: "BA",
//   crm_medico: "846743",
//   situacao_medico: "Ativo"
// })



app.listen(8080, () => {
  console.log("Servidor iniciado")
});





//Inserindo novo médico
// connection.query("INSERT INTO medicos(email_medico, especialidade_medico, nome_medico, telefone_medico, uf_medico, crm_medico, situacao_medico) VALUES ('iris@gmail.com', 'Psicologa', 'Iris', '99999999', 'MG', '432653', 'Ativo')", function(err, result){
//   if(!err){
//     console.log("Medico cadastrado com sucesso!")
//   }else{console.log('Erro ao cadastrar medico')}
// })


//Editando médico existente
// connection.query("UPDATE medicos SET nome_medico = 'Julia' WHERE id_medicos = 4", function(err, result) {
//   if(!err){
//     console.log("Médico editado com sucesso")
//   }else{
//     console.log("Erro ao tentar editar médico")
//   }
// })


//Deletando médico da tabela
// connection.query("DELETE FROM medicos WHERE id_medicos = 2", function(err, result) {
//   if(!err){
//     console.log("Médico apagado com sucesso")
//   }else{
//     console.log("Erro ao tentar apagar médico")
//   }
// })