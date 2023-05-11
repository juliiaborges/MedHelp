const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');


const Sequelize = require('sequelize')
const { sequelize } = require('./backend/models/db');

const Medicos = require('./backend/models/Medicos');
const medico = require('../src/backend/models/Medicos')

const bodyParser = require('body-parser');


//Configuração BodyParser
app.use(bodyParser.urlencoded({ extended: false }))
//Parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname + '/frontend')));

// Define a rota para o seu arquivo HTML
app.get('/cadastroMedicos', function (req, res) {
  res.sendFile(path.join(__dirname + '/frontend/views/cadastroMedicos.html'));
});

//Receber dados do formulário
app.post('/medicoCadastrado', function (req, res) {
  const filePath = path.join(__dirname, '../src/frontend/views/medicoCadastrado.html');
  fs.readFile(filePath, function (err, content) {

    medico.create({
      nome_medico: req.body.nome,
      uf_medico: req.body.uf,
      crm_medico: req.body.crm,
      especialidade_medico: req.body.especialidade,
      situacao_medico: req.body.situacao,
      telefone_medico: req.body.telefone,
      email_medico: req.body.email,
    }).then(function () {
      res.send("Médico cadastrado: "+ req.body.nome)
    }).catch(function (erro) {
      res.send("Erro ao cadastrar médico!" + erro)
    })
  });
});


sequelize.authenticate().then(function () {
  console.log("Conexeão realizada com sucesso")
}).catch(function (err) {
  console.log("Erro ao realizar a conexão com banco de dados: " + err)
})


//Rotas
// app.get('/cadastroMedicos', function (req, res) {
//   const filePath = path.join(__dirname, '../src/frontend/views/cadastroMedicos.html');
//   fs.readFile(filePath, function (err, content) {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Erro ao carregar o arquivo.');
//     } else {
//       res.send(content.toString());
//     }
//   });
// });



//Add médico na tabela
//  Medicos.create({
//    email_medico: "julia@gmail.com",
//    especialidade_medico: "Louco",
//    nome_medico: "Julia",
//    telefone_medico: "9999999",
//    uf_medico: "BA",
//    crm_medico: "846743",
//    situacao_medico: "Ativo"
//  })


// Função para excluir um usuário pelo ID
// async function deleteUserById(id_medicos) {
//   try {
//     const rowsDeleted = await Medicos.destroy({
//       where: { id_medicos }, // Identifica o registro pelo ID
//     });

//     if (rowsDeleted === 0) {
//       console.log(`Nenhum usuário encontrado com o ID ${id_medicos}`);
//     } else {
//       console.log(`Usuário com o ID ${id_medicos} excluído com sucesso`);
//     }
//   } catch (error) {
//     console.error('Erro ao excluir usuário:', error);
//   }
// }

// // Chama a função para excluir um usuário com ID 1
// deleteUserById(7);


//Inserindo novo médico
//  connection.query("INSERT INTO medicos(email_medico, especialidade_medico, nome_medico, telefone_medico, uf_medico, crm_medico, situacao_medico) VALUES ('iris@gmail.com', 'Psicologa', 'Iris', '99999999', 'MG', '432653', 'Ativo')", function(err, result){
//    if(!err){
//     console.log("Medico cadastrado com sucesso!")
//    }else{console.log('Erro ao cadastrar medico')}
//  })


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