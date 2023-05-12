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

// ROTAS ESTOQUE
const estoque = require('../src/backend/models/Estoque');

app.get('/atualizarEstoque', function (req, res) {
  res.sendFile(path.join(__dirname + '/frontend/views/atualizarEstoque.html'));
});


//Receber dados do formulário
app.post('/estoqueCadastrado', function (req, res) {
  const filePath = path.join(__dirname, '../src/frontend/views/estoqueCadastrado');
  fs.readFile(filePath, function (err, content) {

    estoque.create({
      nome_equipamento: req.body.nome,
      quant_Equipamento: req.body.quant,      
    }).then(function () {
      res.send("Equipamento cadastrado: "+ req.body.nome)
    }).catch(function (erro) {
      res.send("Erro ao cadastrar equipamento!" + erro)
    })
  });
});

sequelize.authenticate().then(function () {
    console.log("Conexeão realizada com sucesso")
  }).catch(function (err) {
    console.log("Erro ao realizar a conexão com banco de dados: " + err)
  })
  
  //Segunda parte - Listar Produtos
  // rota para exibir os dados do estoque
  
  app.get('./frontend/views/pesquisaEstoque', function (req, res) {
    res.render('estoque', {estoque: estoque});
  })
  
  app.post('./frontend/views/pesquisaEstoque', function (req, res) {
    estoque.findAll().then(estoque => {
      res.render('pesquisarEstoque', {estoque: estoque});
    }).catch(function (erro) {
      res.send("Erro ao buscar equipamentos!" + erro)
    });
  });
  
//   const pesquisa = require ("./frontend/views/pesquisaEstoque.html")

// app.get('/pesquisaEstoque', function (req, res) {
//   pesquisa.findAll().then(function(pesquisas){
//     res.render('pesquisaEstoque', { pesquisas: pesquisas });
//   });
// });

app.listen(8081, () => {
  console.log("Servidor iniciado")
});

