const express = require("express");
const app = express();
const session = require('express-session');
const { Op } = require("sequelize");
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

// Configurar o middleware de sessão
app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true
}));

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
        res.redirect('/editarProntuario/' + idPaciente);
      } else {
        res.send('Email ou senha inválidos. Por favor, tente novamente.');
      }
    })
    .catch(function (erro) {
      res.send('Erro ao verificar o login do paciente: ' + erro);
    });
});



// Rota para editar o prontuário do paciente
app.get('/editarProntuario/:id_paciente', function (req, res) {
  const idPaciente = req.params.id_paciente;

  // Verificar se o prontuário já existe na tabela "prontuario"
  prontuarioPaciente.findOne({ where: { fk_id_paciente: idPaciente } })
    .then(function (prontuario) {
      if (prontuario) {
        res.render('editarProntuario', { id_paciente: idPaciente, prontuarioPaciente: prontuario });
      } else {
        res.redirect('/prontuarioPaciente/' + idPaciente);
      }
    })
    .catch(function (erro) {
      res.send('Erro ao verificar o prontuário: ' + erro);
    });
});

// Rota para criar o prontuário do paciente
app.get('/prontuarioPaciente/:id_paciente', function (req, res) {
  const idPaciente = req.params.id_paciente;
  res.render('prontuarioPaciente', { id_paciente: idPaciente });
});

// Rota para salvar/atualizar o prontuário do paciente
app.post('/paginaPaciente/:id_paciente', function (req, res) {
  const idPaciente = req.params.id_paciente;
  const { cpf, nome, data_nascimento, alergias, cirurgias, telefone } = req.body;

  // Verificar se o prontuário já existe na tabela "prontuario"
  prontuarioPaciente.findOne({ where: { fk_id_paciente: idPaciente } })
    .then(function (prontuario) {
      if (prontuario) {
        // Atualizar os dados do prontuário existente
        prontuarioPaciente.update(
          {
            cpf_prontuario: cpf,
            nome_prontuario: nome,
            data_nascimento_prontuario: data_nascimento,
            alergias_prontuario: alergias,
            cirurgias_prontuario: cirurgias,
            telefone_prontuario: telefone
          },
          { where: { fk_id_paciente: idPaciente } }
        )
          .then(function () {
            res.send("paginaPaciente");

          })
          .catch(function (erro) {
            res.send('Erro ao atualizar o prontuário: ' + erro);
          });
      } else {
        // Criar um novo prontuário para o paciente
        prontuarioPaciente.create({
          fk_id_paciente: idPaciente,
          cpf_prontuario: cpf,
          nome_prontuario: nome,
          data_nascimento_prontuario: data_nascimento,
          alergias_prontuario: alergias,
          cirurgias_prontuario: cirurgias,
          telefone_prontuario: telefone
        })
          .then(function () {
            res.send("paginaPaciente");
          })
          .catch(function (erro) {
            res.send('Erro ao criar o prontuário: ' + erro);
          });
      }
    })
    .catch(function (erro) {
      res.send('Erro ao verificar o prontuário: ' + erro);
    });
});


// Rota para exibir a página do paciente
app.get("/paginaPaciente/:id_paciente", function (req, res) {
  const idPaciente = req.params.id_paciente;
  res.render("paginaPaciente", { id_paciente: idPaciente });
});

// Rota para exibir a lista de médicos
app.get("/listarMedicos/:id_paciente", function (req, res) {
  const idPaciente = req.params.id_paciente;
  Medicos.findAll()
    .then(function (medicos) {
      res.render("listarMedicos", { Medicos: medicos, id_paciente: idPaciente });
    })
    .catch(function (erro) {
      res.send("Erro ao buscar médicos!" + erro);
    });
});


// Rota para exibir a página de escolha do mês da consulta
app.get("/mesConsulta/:id_paciente/:id_medicos", function (req, res) {
  const idPaciente = req.params.id_paciente;
  const idMedicos = req.params.id_medicos;
  Medicos.findByPk(idMedicos)
    .then(function (medico) {
      if (medico) {
        res.render("mesConsulta", {
          medico: medico,
          idMedicos: idMedicos,
          idPaciente: idPaciente,
        });
      } else {
        res.send("Médico não encontrado!");
      }
    })
    .catch(function (erro) {
      res.send("Erro ao buscar médico!" + erro);
    });
});

app.post("/mesConsulta/:id_paciente/:id_medicos", function (req, res) {
  const idPaciente = req.params.id_paciente;
  const idMedicos = req.params.id_medicos;
  const mesConsulta =  req.body.mes;
  

  // Salve a escolha do mês no banco de dados
  Consulta.create({
    fk_id_paciente: idPaciente,
    fk_id_medicos: idMedicos,
    mes_consulta: mesConsulta,
  })
    .then(function (consulta) {
      const idConsulta = consulta.id_consulta;
      req.session.idConsulta = idConsulta; // Armazenar o idConsulta na sessão
      res.redirect(idConsulta);
    })
    .catch(function (erro) {
      res.send('Erro ao criar a consulta: ' + erro);
    });
}); 

app.get('/junho', function (req, res) {
  const idConsulta = req.session.idConsulta; // Obter o idConsulta da sessão
  res.render('junho', { idConsulta: idConsulta, errorMessage: null, successMessage: null });
});

app.post("/junho", function (req, res) {
  const idConsulta = req.session.idConsulta;
  const diaConsulta = req.body.diaConsulta;
  const horarioConsulta = req.body.horarioConsulta;

  Consulta.findByPk(idConsulta)
    .then(function (consulta) {
      if (consulta) {
        // Verificar se já existe uma consulta marcada na mesma data e horário
        Consulta.findOne({
          where: {
            dia_consulta: diaConsulta,
            horario_consulta: horarioConsulta,
            id_consulta: {
              [Op.ne]: idConsulta, // Excluir a própria consulta da verificação
            },
          },
        })
          .then(function (existingConsulta) {
            if (existingConsulta) {
              // Consulta já existe, mostrar uma mensagem de erro
              res.json({ error: "Data ocupada, tente agendar em outra data e/ou horário." });
            } else {
              // Atualizar os dados da consulta existente
              consulta
                .update({
                  dia_consulta: diaConsulta,
                  horario_consulta: horarioConsulta,
                })
                .then(function () {
                  res.json({ success: "Consulta agendada com sucesso!" });
                })
                .catch(function (erro) {
                  res.json({ error: "Erro ao atualizar a consulta: " + erro });
                });
            }
          })
          .catch(function (erro) {
            res.json({ error: "Erro ao verificar a consulta: " + erro });
          });
      } else {
        // Criar uma nova consulta para o paciente
        Consulta.findOne({
          where: {
            dia_consulta: diaConsulta,
            horario_consulta: horarioConsulta,
          },
        })
          .then(function (existingConsulta) {
            if (existingConsulta) {
              // Consulta já existe, mostrar uma mensagem de erro
              res.json({ error: "Já existe uma consulta marcada para essa data e horário, tente selecionar outro dia ou horário." });
            } else {
              Consulta.create({
                dia_consulta: diaConsulta,
                horario_consulta: horarioConsulta,
              })
                .then(function () {
                  res.json({ success: "Consulta agendada com sucesso" });
                })
                .catch(function (erro) {
                  res.json({ error: "Erro ao criar a consulta: " + erro });
                });
            }
          })
          .catch(function (erro) {
            res.json({ error: "Erro ao verificar a consulta: " + erro });
          });
      }
    })
    .catch(function (erro) {
      res.json({ error: "Erro ao verificar a consulta: " + erro });
    });
});

app.get('/julho', function (req, res) {
  const idConsulta = req.session.idConsulta; // Obter o idConsulta da sessão
  res.render('julho', { idConsulta: idConsulta, errorMessage: null, successMessage: null });
});

app.post("/julho", function (req, res) {
  const idConsulta = req.session.idConsulta;
  const diaConsulta = req.body.diaConsulta;
  const horarioConsulta = req.body.horarioConsulta;

  Consulta.findByPk(idConsulta)
    .then(function (consulta) {
      if (consulta) {
        // Verificar se já existe uma consulta marcada na mesma data e horário
        Consulta.findOne({
          where: {
            dia_consulta: diaConsulta,
            horario_consulta: horarioConsulta,
            id_consulta: {
              [Op.ne]: idConsulta, // Excluir a própria consulta da verificação
            },
          },
        })
          .then(function (existingConsulta) {
            if (existingConsulta) {
              // Consulta já existe, mostrar uma mensagem de erro
              res.json({ error: "Data ocupada, tente agendar em outra data e/ou horário." });
            } else {
              // Atualizar os dados da consulta existente
              consulta
                .update({
                  dia_consulta: diaConsulta,
                  horario_consulta: horarioConsulta,
                })
                .then(function () {
                  res.json({ success: "Consulta agendada com sucesso!" });
                })
                .catch(function (erro) {
                  res.json({ error: "Erro ao atualizar a consulta: " + erro });
                });
            }
          })
          .catch(function (erro) {
            res.json({ error: "Erro ao verificar a consulta: " + erro });
          });
      } else {
        // Criar uma nova consulta para o paciente
        Consulta.findOne({
          where: {
            dia_consulta: diaConsulta,
            horario_consulta: horarioConsulta,
          },
        })
          .then(function (existingConsulta) {
            if (existingConsulta) {
              // Consulta já existe, mostrar uma mensagem de erro
              res.json({ error: "Já existe uma consulta marcada para essa data e horário, tente selecionar outro dia ou horário." });
            } else {
              Consulta.create({
                dia_consulta: diaConsulta,
                horario_consulta: horarioConsulta,
              })
                .then(function () {
                  res.json({ success: "Consulta agendada com sucesso" });
                })
                .catch(function (erro) {
                  res.json({ error: "Erro ao criar a consulta: " + erro });
                });
            }
          })
          .catch(function (erro) {
            res.json({ error: "Erro ao verificar a consulta: " + erro });
          });
      }
    })
    .catch(function (erro) {
      res.json({ error: "Erro ao verificar a consulta: " + erro });
    });
});

app.get('/agosto', function (req, res) {
  const idConsulta = req.session.idConsulta; // Obter o idConsulta da sessão
  res.render('agosto', { idConsulta: idConsulta, errorMessage: null, successMessage: null });
});

app.post("/agosto", function (req, res) {
  const idConsulta = req.session.idConsulta;
  const diaConsulta = req.body.diaConsulta;
  const horarioConsulta = req.body.horarioConsulta;

  Consulta.findByPk(idConsulta)
    .then(function (consulta) {
      if (consulta) {
        // Verificar se já existe uma consulta marcada na mesma data e horário
        Consulta.findOne({
          where: {
            dia_consulta: diaConsulta,
            horario_consulta: horarioConsulta,
            id_consulta: {
              [Op.ne]: idConsulta, // Excluir a própria consulta da verificação
            },
          },
        })
          .then(function (existingConsulta) {
            if (existingConsulta) {
              // Consulta já existe, mostrar uma mensagem de erro
              res.json({ error: "Data ocupada, tente agendar em outra data e/ou horário." });
            } else {
              // Atualizar os dados da consulta existente
              consulta
                .update({
                  dia_consulta: diaConsulta,
                  horario_consulta: horarioConsulta,
                })
                .then(function () {
                  res.json({ success: "Consulta agendada com sucesso!" });
                })
                .catch(function (erro) {
                  res.json({ error: "Erro ao atualizar a consulta: " + erro });
                });
            }
          })
          .catch(function (erro) {
            res.json({ error: "Erro ao verificar a consulta: " + erro });
          });
      } else {
        // Criar uma nova consulta para o paciente
        Consulta.findOne({
          where: {
            dia_consulta: diaConsulta,
            horario_consulta: horarioConsulta,
          },
        })
          .then(function (existingConsulta) {
            if (existingConsulta) {
              // Consulta já existe, mostrar uma mensagem de erro
              res.json({ error: "Já existe uma consulta marcada para essa data e horário, tente selecionar outro dia ou horário." });
            } else {
              Consulta.create({
                dia_consulta: diaConsulta,
                horario_consulta: horarioConsulta,
              })
                .then(function () {
                  res.json({ success: "Consulta agendada com sucesso" });
                })
                .catch(function (erro) {
                  res.json({ error: "Erro ao criar a consulta: " + erro });
                });
            }
          })
          .catch(function (erro) {
            res.json({ error: "Erro ao verificar a consulta: " + erro });
          });
      }
    })
    .catch(function (erro) {
      res.json({ error: "Erro ao verificar a consulta: " + erro });
    });
});

app.get('/setembro', function (req, res) {
  const idConsulta = req.session.idConsulta; // Obter o idConsulta da sessão
  res.render('setembro', { idConsulta: idConsulta, errorMessage: null, successMessage: null });
});

app.post("/setembro", function (req, res) {
  const idConsulta = req.session.idConsulta;
  const diaConsulta = req.body.diaConsulta;
  const horarioConsulta = req.body.horarioConsulta;

  Consulta.findByPk(idConsulta)
    .then(function (consulta) {
      if (consulta) {
        // Verificar se já existe uma consulta marcada na mesma data e horário
        Consulta.findOne({
          where: {
            dia_consulta: diaConsulta,
            horario_consulta: horarioConsulta,
            id_consulta: {
              [Op.ne]: idConsulta, // Excluir a própria consulta da verificação
            },
          },
        })
          .then(function (existingConsulta) {
            if (existingConsulta) {
              // Consulta já existe, mostrar uma mensagem de erro
              res.json({ error: "Data ocupada, tente agendar em outra data e/ou horário." });
            } else {
              // Atualizar os dados da consulta existente
              consulta
                .update({
                  dia_consulta: diaConsulta,
                  horario_consulta: horarioConsulta,
                })
                .then(function () {
                  res.json({ success: "Consulta agendada com sucesso!" });
                })
                .catch(function (erro) {
                  res.json({ error: "Erro ao atualizar a consulta: " + erro });
                });
            }
          })
          .catch(function (erro) {
            res.json({ error: "Erro ao verificar a consulta: " + erro });
          });
      } else {
        // Criar uma nova consulta para o paciente
        Consulta.findOne({
          where: {
            dia_consulta: diaConsulta,
            horario_consulta: horarioConsulta,
          },
        })
          .then(function (existingConsulta) {
            if (existingConsulta) {
              // Consulta já existe, mostrar uma mensagem de erro
              res.json({ error: "Já existe uma consulta marcada para essa data e horário, tente selecionar outro dia ou horário." });
            } else {
              Consulta.create({
                dia_consulta: diaConsulta,
                horario_consulta: horarioConsulta,
              })
                .then(function () {
                  res.json({ success: "Consulta agendada com sucesso" });
                })
                .catch(function (erro) {
                  res.json({ error: "Erro ao criar a consulta: " + erro });
                });
            }
          })
          .catch(function (erro) {
            res.json({ error: "Erro ao verificar a consulta: " + erro });
          });
      }
    })
    .catch(function (erro) {
      res.json({ error: "Erro ao verificar a consulta: " + erro });
    });
});


//médico alterar prontuario paciente


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

app.listen(8081, () => {
  console.log("Servidor iniciado");
});