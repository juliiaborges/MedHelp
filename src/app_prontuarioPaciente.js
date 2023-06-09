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
const Paciente = require('../src/backend/models/prontuarioPaciente');

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
  
  //Edição
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'frontend', 'views'));



  // Rota para exibir a lista de pacientes

  app.get('/lista_pacientes', function (req, res) {
    prontuarioPaciente
      .findAll()
      .then(function (pacientes) {
        res.render('lista_pacientes', { pacientes: pacientes });
      })
      .catch(function (erro) {
        res.send("Erro ao buscar pacientes!" + erro);
      });
  });

// Rota para exibir o formulário de edição do paciente

app.get('/editar_paciente/:cpf_paciente', function(req, res) {
  const cpfPaciente = req.params.cpf_paciente;
  Paciente.findByPk(cpfPaciente)
    .then(function (paciente) {
      if (paciente) {
        res.render('editar_paciente', { paciente: paciente });
      } else {
        res.send('Paciente não encontrado');
      }
    })
    .catch(function (erro) {
      res.send('Erro ao buscar paciente: ' + erro);
    });
});

app.post('/editar_paciente/:cpf_paciente', function(req, res) {
  const cpfPaciente = req.params.cpf_paciente;
  const { nome, cpf, telefone, plano, data_nascimento, alergias, cirurgias, observacoes } = req.body;
  
  Paciente.findByPk(cpfPaciente)
    .then(function(paciente) {
      if (paciente) {
        paciente.nome_paciente = nome;
        paciente.cpf_paciente = cpf;
        paciente.telefone_paciente = telefone;
        paciente.possui_plano = plano;
        paciente.data_nascimento_paciente = data_nascimento;
        paciente.alergias_paciente = alergias;
        paciente.cirurgias_paciente = cirurgias;
        paciente.observacoes_paciente = observacoes;
        
        return paciente.save();
      } else {
        res.send('Paciente não encontrado');
      }
    })
    .then(function(paciente) {
      res.redirect('/lista_pacientes'); // Redireciona para a página de listagem de pacientes após a atualização
    })
    .catch(function(erro) {
      res.send('Erro ao atualizar paciente: ' + erro);
    });
});




// Rota para atualizar o paciente com as observações do médico
app.post('/atualizar_paciente/:id', function (req, res) {
  const pacienteId = req.params.id;
  const observacoes = req.body.observacoes;
  pacienteId.findByPk(pacienteId)
    .then(function (paciente) {
      if (paciente) {
        paciente.update({ observacoes_paciente: observacoes })
          .then(function () {
            res.send('Paciente atualizado: ' + paciente.nome_paciente);
          })
          .catch(function (erro) {
            res.send('Erro ao atualizar prontuário do paciente: ' + erro);
          });
      } else {
        res.send('Paciente não encontrado');
      }
    })
    .catch(function (erro) {
      res.send('Erro ao buscar paciente: ' + erro);
    });
});

app.listen(8080, () => {
  console.log("Servidor iniciado")
});

