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
    console.log("Conexão realizada com sucesso")
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
  // ...
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'frontend/views'));
// Rota para exibir a página de listagem de equipamentos
app.get('/listarEquipamentos', function (req, res) {
  estoque.findAll().then(function (equipamentos) {
    res.render('listarEquipamentos', { equipamentos: equipamentos });
  }).catch(function (erro) {
    res.send('Erro ao buscar equipamentos: ' + erro);
  });
});

// Rota para atualizar a quantidade do equipamento selecionado
app.post('/atualizar_quantidade/:id', function (req, res) {
  const equipamentoId = req.params.id;
  const novaQuantidade = req.body.quantidade;

  estoque.findByPk(equipamentoId).then(function (equipamento) {
    if (equipamento) {
      const quantidadeAnterior = equipamento.quant_Equipamento;
      const quantidadeAtualizada = parseInt(quantidadeAnterior) + parseInt(novaQuantidade);

      equipamento.update({ quant_Equipamento: quantidadeAtualizada }).then(function () {
        res.redirect('/listarEquipamentos');
      }).catch(function (erro) {
        res.send('Erro ao atualizar a quantidade do equipamento: ' + erro);
      });
    } else {
      res.send('Equipamento não encontrado');
    }
  }).catch(function (erro) {
    res.send('Erro ao buscar equipamento: ' + erro);
  });
});

// Rota para registrar o uso do equipamento selecionado
app.post('/registrar_uso/:id', function (req, res) {
  const equipamentoId = req.params.id;
  const resposta = req.body.resposta;

  // Lógica para registrar o uso do equipamento de acordo com a resposta (Sim ou Não)

  // res.redirect('/estoqueCadastrado');
});

// Rota para redirecionar para a página de listagem após cadastrar um novo equipamento
app.post('/estoqueCadastrado', function (req, res) {
  // Lógica para cadastrar um novo equipamento

  // res.redirect('/estoqueCadastrado');
});


// ...

//   const pesquisa = require ("./frontend/views/pesquisaEstoque.html")

// app.get('/pesquisaEstoque', function (req, res) {
//   pesquisa.findAll().then(function(pesquisas){
//     res.render('pesquisaEstoque', { pesquisas: pesquisas });
//   });
// });

app.listen(8080, () => {
  console.log("Servidor iniciado")
});

