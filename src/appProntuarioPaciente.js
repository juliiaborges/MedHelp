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
const prontuarioPaciente = require('./backend/models/prontuarioPaciente');
const prontuario = require('./backend/models/prontuarioPaciente');

app.get('/prontuarioPaciente', function (req, res) {
  res.sendFile(path.join(__dirname + '/frontend/views/prontuarioPaciente.html'));
});


//Receber dados do formulário

app.post('/prontuarioPacienteCadastrado', function (req, res) {
  const filePath = path.join(__dirname, '../src/frontend/views/prontuarioPacienteCadastrado.html');
  fs.readFile(filePath, function (err, content) {

    prontuarioPaciente.create({
      cpf_prontuario: req.body.cpf,
      nome_prontuario: req.body.nome,
      data_nascimento_prontuario: req.body.data_nascimento,
      alergias_prontuario:req.body.alergias,
      cirurgias_prontuario: req.body.cirurgias,  
      telefone_prontuario: req.body.telefone
         
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

  app.get('/listarPacientes', function (req, res) {
    prontuarioPaciente
      .findAll()
      .then(function (prontuario) {
        res.render('listarPacientes', { prontuario: prontuario });
      })
      .catch(function (erro) {
        res.send("Erro ao buscar pacientes!" + erro);
      });
  });

// Rota para exibir o formulário de edição do paciente

app.get('/editarPacientes/:id_prontuario', function(req, res) {
  const idProntuario = req.params.id_prontuario;
  prontuario.findByPk(idProntuario)
    .then(function (prontuario) {
      if (prontuario) {
        res.render('editarPacientes', { prontuario: prontuario });
      } else {
        res.send('Paciente não encontrado');
      }
    })
    .catch(function (erro) {
      res.send('Erro ao buscar paciente: ' + erro);
    });
});

app.post('/editarPacientes/:id_prontuario', function(req, res) {
  const idProntuario = req.params.id_prontuario;
  const { nome, cpf, telefone, plano, data_nascimento, alergias, cirurgias, observacoes } = req.body;
  
  prontuario.findByPk(idProntuario)
    .then(function(prontuario) {
      if (prontuario) {
        prontuario.nome_prontuario= nome;
        prontuario.cpf_prontuario = cpf;
        prontuario.telefone_prontuario = telefone;
        prontuario.data_nascimento_prontuario = data_nascimento;
        prontuario.alergias_prontuario = alergias;
        prontuario.cirurgias_prontuario = cirurgias;
        prontuario.observacoes_prontuario = observacoes;
        
        return prontuario.save();
      } else {
        res.send('Paciente não encontrado');
      }
    })
    .then(function(prontuario) {
      res.redirect('/listarPacientes'); // Redireciona para a página de listagem de pacientes após a atualização
    })
    .catch(function(erro) {
      res.send('Erro ao atualizar paciente: ' + erro);
    });
});




// Rota para atualizar o paciente com as observações do médico
app.post('/atualizar_paciente/:id_prontuario', function (req, res) {
  const prontuarioId = req.params.id_prontuario;
  const observacoes = req.body.observacoes;
  prontuarioId.findByPk(prontuarioId)
    .then(function (prontuario) {
      if (prontuario) {
        prontuario.update({ observacoes_prontuario: observacoes })
          .then(function () {
            res.send('Paciente atualizado: ' + prontuario.nome_prontuario);
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

