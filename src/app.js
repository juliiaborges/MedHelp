const express = require("express");
const app = express();

const fs = require("fs");
const path = require("path");

const Sequelize = require("sequelize");
const { sequelize } = require("./backend/models/db");

const Medicos = require("./backend/models/Medicos");
const Consulta = require("./backend/models/Consulta");
const Paciente = require("./backend/models/Paciente");
const prontuarioPaciente = require('./backend/models/prontuarioPaciente');
const prontuario = require('./backend/models/prontuarioPaciente');

const bodyParser = require("body-parser");

// Configuração BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./frontend")));

// Define a rota para o cadastro de médicos
app.get("/cadastroMedicos", function (req, res) {
  res.sendFile(path.join(__dirname, "/frontend/views/cadastroMedicos.html"));
});

// Receber dados do formulário de cadastro de médicos
app.post("/medicoCadastrado", function (req, res) {
  Medicos.create({
    nome_medico: req.body.nome,
    uf_medico: req.body.uf,
    crm_medico: req.body.crm,
    especialidade_medico: req.body.especialidade,
    situacao_medico: req.body.situacao,
    telefone_medico: req.body.telefone,
    email_medico: req.body.email,
  })
    .then(function () {
      res.send("Médico cadastrado: " + req.body.nome);
    })
    .catch(function (erro) {
      res.send("Erro ao cadastrar médico!" + erro);
    });
});

//Define a rota para o login do paciente

app.get('/loginPaciente', function (req, res) {
  res.sendFile(path.join(__dirname + '/frontend/views/loginPaciente.html'));
});


// Receber dados do formulário de cadastro de médicos
app.post('/pacienteCadastrado', function (req, res) {
  Paciente.create({
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
// Verificar Login do Paciente
app.post('/prontuarioPaciente', function (req, res) {
  const email = req.body.loginEmail;
  const senha = req.body.loginSenha;

  Paciente.findOne({
    where: {
      email_paciente: email,
      senha_paciente: senha,
    },
  })
    .then(function (paciente) {
      if (paciente) {
        const idPaciente = paciente.id_paciente;
        res.redirect('/prontuarioPaciente/' + idPaciente);
      } else {
        res.send('Email ou senha inválidos. Por favor, tente novamente.');
      }
    })
    .catch(function (erro) {
      res.send('Erro ao verificar o login do paciente: ' + erro);
    });
});

app.get('/prontuarioPaciente/:id_paciente', function (req, res) {
  const idPaciente = req.params.id_paciente;
  res.render('prontuarioPaciente', { id_paciente: idPaciente });
});


//Define a rota para o prontuario paciente 

app.get('/prontuarioPaciente', function (req, res) {
  const idPaciente = req.query.id_paciente;
  res.render('prontuarioPaciente', { id_paciente: idPaciente });
});


//Receber dados do formulário

app.post('/paginaPaciente', function (req, res) {
  const filePath = path.join(__dirname, '../src/frontend/views/paginaPaciente.ejs');
  fs.readFile(filePath, function (err, content) {

    prontuarioPaciente.create({
      cpf_prontuario: req.body.cpf,
      nome_prontuario: req.body.nome,
      data_nascimento_prontuario: req.body.data_nascimento,
      alergias_prontuario:req.body.alergias,
      cirurgias_prontuario: req.body.cirurgias,  
      telefone_prontuario: req.body.telefone
         
    }).then(function () {
      res.render('paginaPaciente');
    }).catch(function (erro) {
      res.send("Erro ao cadastrar prontuário do paciente!" + erro)
    })
  });
});

// Rota para exibir a página do paciente
app.get("/paginaPaciente", function (req, res) {
  res.sendFile(path.join(__dirname, "/frontend/views/paginaPaciente.ejs"));
});

// Rota para listar médicos
app.get("/listarMedicos", function (req, res) {
  Medicos.findAll()
    .then(function (medicos) {
      res.render("listarMedicos", { Medicos: medicos });
    })
    .catch(function (erro) {
      res.send("Erro ao buscar médicos!" + erro);
    });
});


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
  const { nome, cpf, telefone, data_nascimento, alergias, cirurgias, observacoes } = req.body;
  
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

// Rota para exibir meses disponíveis para consulta
app.get("/mesConsulta/:id_medicos", function (req, res) {
  const idMedicos = req.params.id_medicos;
  Medicos.findByPk(idMedicos)
    .then(function (medico) {
      if (medico) {
        res.render("mesConsulta", {
          medico: medico,
        });
      } else {
        res.send("Médico não encontrado!");
      }
    })
    .catch(function (erro) {
      res.send("Erro ao buscar médico!" + erro);
    });
});


// Rota para exibir meses disponíveis para consulta

app.get("/dataConsulta/:id_medicos", function (req, res) {
  const idMedicos = req.params.id_medicos;
  Medicos.findByPk(idMedicos)
    .then(function (medico) {
      if (medico) {
        res.render("dataConsulta", {
          medico: medico,
        });
      } else {
        res.send("Médico não encontrado!");
      }
    })
    .catch(function (erro) {
      res.send("Erro ao buscar médico!" + erro);
    });
});

  sequelize
  .authenticate()
  .then(function () {
    console.log("Conexão realizada com sucesso");
  })
  .catch(function (err) {
    console.log("Erro ao realizar a conexão com banco de dados: " + err);
  });

app.set("views", path.join(__dirname, "/frontend/views"));
app.set("view engine", "ejs");

app.listen(8080, () => {
  console.log("Servidor iniciado");
});