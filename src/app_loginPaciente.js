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
const paciente = require('../src/backend/models/Paciente');

app.get('/login_paciente', function (req, res) {
  res.sendFile(path.join(__dirname + '/frontend/views/login_paciente.html'));
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

//Verificação Login



app.listen(8082, () => {
  console.log("Servidor iniciado")
});

