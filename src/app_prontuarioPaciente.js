const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize')
const { sequelize } = require('./backend/models/db');

//Configuração BodyParser
app.use(bodyParser.urlencoded({ extended: false }))
//Parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname + '/frontend')));

// ROTAS PRONTUARIO
const prontuarioPaciente = require('../src/backend/models/prontuarioPaciente');

app.get('/prontuario_paciente', function (req, res) {
  res.sendFile(path.join(__dirname + '/frontend/views/prontuario_paciente.html'));
});


//Receber dados do formulário

app.post('/prontuarioPaciente_cadastrado', function (req, res) {
  const filePath = path.join(__dirname, '../src/frontend/views/prontuarioPaciente_cadastrado.html');
  fs.readFile(filePath, function (err, content) {

    prontuarioPaciente.create({
      cpf_paciente: req.body.cpf,
      nome_paciente: req.body.nome,
      data_nascimento_paciente: req.body.data_nascimento,
      alergias_paciente:req.body.alergias,
      cirurgias_paciente: req.body.cirurgias,  
      telefone_paciente: req.body.telefone,
      possui_plano: req.body.possui_plano,
         
    }).then(function () {
      res.send("Prontuário Cadastrado do paciente: "+ req.body.nome)
    }).catch(function (erro) {
      res.send("Erro ao cadastrar prontuário do paciente!" + erro)
    })
  });
});

sequelize.authenticate().then(function () {
    console.log("Conexão realizada com sucesso")
  }).catch(function (err) {
    console.log("Erro ao realizar a conexão com banco de dados: " + err)
  })
  
  //Segunda parte - Listar Produtos
  // rota para exibir os dados do estoque
  
  // app.get('./frontend/views/prontuarioPaciente_cadastrado', function (req, res) {
  //   res.render('prontuarioPaciente', {prontuarioPaciente: prontuarioPaciente});
  // })
  
  // app.post('./frontend/views/prontuarioPaciente_cadastrado', function (req, res) {
  //   prontuarioPaciente.findAll().then(prontuarioPaciente => {
  //     res.render('prontuarioPaciente', {prontuarioPaciente: prontuarioPaciente});
  //   }).catch(function (erro) {
  //     res.send("Erro ao buscar equipamentos!" + erro)
  //   });
  // });
  
//   const pesquisa = require ("./frontend/views/pesquisaEstoque.html")

// app.get('/pesquisaEstoque', function (req, res) {
//   pesquisa.findAll().then(function(pesquisas){
//     res.render('pesquisaEstoque', { pesquisas: pesquisas });
//   });
// });

app.listen(8082, () => {
  console.log("Servidor iniciado")
});

