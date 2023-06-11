const express = require("express");
const app = express();

const fs = require("fs");
const path = require("path");

const Sequelize = require("sequelize");
const { sequelize } = require("./backend/models/db");

const Medicos = require("./backend/models/Medicos");
const Consulta = require("./backend/models/Consulta");

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
  })
    .then(function () {
      res.send("Médico cadastrado: " + req.body.nome);
    })
    .catch(function (erro) {
      res.send("Erro ao cadastrar médico!" + erro);
    });
});

// Rota para listar médicos
app.get("/listarMedicos", function (req, res) {
  Medicos.findAll()
    .then(function (medicos) {
      res.render("listarMedicos", { medicos: medicos });
    })
    .catch(function (erro) {
      res.send("Erro ao buscar médicos!" + erro);
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

// Rota para salvar a escolha do mês da consulta
app.post("/diaConsulta", function (req, res) {
  const idMedicos = req.body.id_medicos;
  const mesConsulta = req.body.mes;

  // Salve a escolha do mês no banco de dados
  Consulta.create({
    mes_consulta: mesConsulta,
    fk_id_medicos: idMedicos,
    // Defina os valores restantes do objeto de acordo com suas necessidades
  })
    .then(function () {
      res.redirect("/diaConsulta/" + mesConsulta + "/" + idMedicos);
    })
    .catch(function (erro) {
      res.send("Erro ao registrar escolha do mês: " + erro);
    });
});

// Rota para escolher o dia da consulta
app.get("/diaConsulta/:mes_consulta/:id_medicos", function (req, res) {
  const mesConsulta = req.params.mes_consulta;
  const idMedicos = req.params.id_medicos;
  res.render("diaConsulta", {
    mesConsulta: mesConsulta,
    idMedicos: idMedicos,
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