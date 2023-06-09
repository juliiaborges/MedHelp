const express = require("express");
const app = express();

const fs = require("fs");
const path = require("path");

const Sequelize = require("sequelize");
const { sequelize } = require("./backend/models/db");

const Medicos = require("./backend/models/Medicos");


const bodyParser = require("body-parser");

// Configuração BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/frontend")));

// Define a rota para o seu arquivo HTML de cadastro de médicos
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
    horario_disponivel_inicio: req.body.horarioInicio,
    horario_disponivel_fim: req.body.horarioFim,
    dia_disponivel: req.body.diaSemana,
  })
    .then(function () {
      res.send("Médico cadastrado: " + req.body.nome);
    })
    .catch(function (erro) {
      res.send("Erro ao cadastrar médico!" + erro);
    });
});

//SPRINT 6

// Rota para listar todos os médicos disponíveis
app.get("/lista_medicos", function (req, res) {
  const dataConsulta = req.query.dataConsulta; // Obter o valor de dataConsulta da query string
  const horarioConsulta = req.query.horarioConsulta; // Obter o valor de horarioConsulta da query string
  Medicos.findAll()
    .then(function (medicos) {
      res.render("lista_medicos", { medicos, dataConsulta, horarioConsulta }); // Passar a variável dataConsulta e horarioConsulta para o template
    })
    .catch(function (erro) {
      console.log("Erro ao buscar médicos disponíveis: " + erro);
      res.status(500).json({ error: "Erro ao buscar médicos disponíveis" });
    });
});

// Rota para confirmar a consulta com um médico específico
app.get("/confirmar-consulta/:id/:data/:horario", function (req, res) {
  const medicoId = req.params.id_medico;
  const dataConsulta = req.params.data;
  const horarioConsulta = req.params.horario;
  Medicos.findByPk(medicoId)
    .then(function (medico) {
      res.render("confirma-consulta", {
        medico,
        dataConsulta,
        horarioConsulta,
      });
    })
    .catch(function (erro) {
      console.log("Erro ao buscar médico: " + erro);
      res.status(500).json({ error: "Erro ao buscar médico" });
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

//Rota para Listar Médicos
app.get("/listarMedicos", function (req, res) {
  Medicos.findAll()
    .then(function (Medicos) {
      res.render("listarMedicos", { Medicos: Medicos });
    })
    .catch(function (erro) {
      res.send("Erro ao buscar Médicos!" + erro);
    });
});

//Rota para exibir horários disponíveis dos médicos
const medicos = require("./backend/models/Medicos");
// Rota para exibir horários disponíveis dos médicos
app.get("/horarioMedicos/:id_medicos", function (req, res) {
  const idMedicos = req.params.id_medicos;
  Medicos.findByPk(idMedicos)
    .then(function (medicos) {
      if (medicos) {
        res.render("horarioMedicos", { medicos: Medicos });
      } else {
        res.send("Médico não encontrado!");
      }
    })
    .catch(function (erro) {
      res.send("Erro ao buscar Médico!" + erro);
    });
});
