const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const { sequelize } = require('./backend/models/db');


//Configuração BodyParser
app.use(bodyParser.urlencoded({ extended: false }))
//Parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname + '/frontend')));

// ROTAS ESTOQUE
const paciente = require('./backend/models/Paciente');

app.get('/loginPaciente', function (req, res) {
  res.sendFile(path.join(__dirname + '/frontend/views/loginPaciente.html'));
});


// Receber dados do formulário de cadastro de médicos
app.post('/pacienteCadastrado', function (req, res) {
  paciente.create({
    email_paciente: req.body.email_paciente,
    senha_paciente: req.body.senha_paciente,
  })
    .then(function () {
      res.send('Paciente cadastrado: ' + req.body.email_paciente);
    })
    .catch(function (erro) {
      res.send('Erro ao cadastrar médico!' + erro);
    });
});

sequelize.authenticate().then(function () {
  console.log("Conexão realizada com sucesso")
}).catch(function (err) {
  console.log("Erro  " + err)
})
// Verificar Login do Paciente
app.post('/verificarLogin', function (req, res) {
  const email = req.body.loginEmail;
  const senha = req.body.loginSenha;

  paciente.findOne({
    where: {
      email_paciente: email,
      senha_paciente: senha,
    },
  })
    .then(function (paciente) {
      if (paciente) {
        res.send('Login bem-sucedido. Bem-vindo, ' + paciente.email_paciente + '!');
      } else {
        res.send('Email ou senha inválidos. Por favor, tente novamente.');
      }
    })
    .catch(function (erro) {
      res.send('Erro ao verificar o login do paciente: ' + erro);
    });
});


app.listen(8080, () => {
  console.log("Servidor iniciado")
});

