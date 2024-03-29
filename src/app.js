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
const estoque = require('./backend/models/Estoque');
const Funcionario = require('./backend/models/Funcionario');
const pagamento = require("./backend/models/Pagamentos");

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

app.get("/index", function(req,res){
  res.sendFile(path.join(__dirname, "/frontend/index.html"));
});

// Define a rota para o cadastro de médicos
app.get("/cadastroMedicos", function (req, res) {
  res.sendFile(path.join(__dirname, "/frontend/views/cadastroMedicos.html"));
});

app.get("/paginaMedico", function(req,res){
  const idMedico = req.session.idMedico;
  res.render("paginaMedico", { id_medico: idMedico });
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
    senha_medico: req.body.senha,
  })
  .then(function () {
    res.render("paginaFuncionario");
  })
    .catch(function (erro) {
      res.send("Erro ao cadastrar médico!" + erro);
    });
});

app.get('/login', function (req, res){
  res.render('login');
});

// login funcionário

app.get('/loginFuncionario', function (req, res){
  const errorMessage = req.query.error;
  const successMessage = req.query.success;
  res.render('loginFuncionario', { error: errorMessage, success: successMessage });
});

// Define a rota para o login do médico
app.post('/loginFuncionario', function (req, res) {
  const email = req.body.loginEmail;
  const senha = req.body.loginSenha;

  // Verifica se as credenciais estão corretas
  Funcionario.findOne({
    where: {
      email_funcionario: email,
      senha_funcionario: senha,
    },
  })
    .then(function (funcionario) {
      if (funcionario) {
        res.render('paginaFuncionario', { id_funcionario: funcionario.id_funcionario });
      } else {
        const errorMessage = 'Credenciais inválidas. Verifique seu email e senha.';
        res.redirect('/loginFuncionario?error=' + encodeURIComponent(errorMessage));
      }
    })
    .catch(function (erro) {
      res.send('Erro ao verificar as credenciais do funcionario: ' + erro);
    });
});

//Define a rota para o login do medico
app.get('/loginMedico', function (req, res) {
  const errorMessage = req.query.error;
  const successMessage = req.query.success;
  res.render('loginMedico', { error: errorMessage, success: successMessage });
});

// Define a rota para o login do médico
app.post('/loginMedico', function (req, res) {
  const email = req.body.loginEmail;
  const senha = req.body.loginSenha;

  // Verifica se as credenciais estão corretas
  Medicos.findOne({
    where: {
      email_medico: email,
      senha_medico: senha,
    },
  })
    .then(function (medico) {
      if (medico) {
        res.render('paginaMedico', { id_medico: medico.id_medicos });
      } else {
        const errorMessage = 'Credenciais inválidas. Verifique seu email e senha.';
        res.redirect('/loginMedico?error=' + encodeURIComponent(errorMessage));
      }
    })
    .catch(function (erro) {
      res.send('Erro ao verificar as credenciais do médico: ' + erro);
    });
});

app.get('/consultasMedico/:id_medico', function(req, res){
  const idMedico = req.params.id_medico;
  Consulta.findAll({
    where: {
      fk_id_medicos: idMedico,
      mes_consulta: { [Op.ne]: null },
      dia_consulta: { [Op.ne]: null },
      horario_consulta: { [Op.ne]: null },
    }
  })
    .then(function (consultas) {
      res.render('consultasMedico', { consultas: consultas });
    })
    .catch(function (erro) {
      res.send('Erro ao buscar consultas agendadas: ' + erro);
    });
});


//Define a rota para o login do paciente

app.get('/loginPaciente', function (req, res) {
  const errorMessage = req.query.error;
  const successMessage = req.query.success;
  res.render('loginPaciente', { error: errorMessage, success: successMessage });
});

// Receber dados do formulário de cadastro de médicos
app.post('/pacienteCadastrado', function (req, res) {
  const email = req.body.email_paciente;

  // Verifica se já existe um paciente com o mesmo email
  Paciente.findOne({
    where: {
      email_paciente: email,
    },
  })
    .then(function (paciente) {
      if (paciente) {
        const errorMessage = 'O email informado já está em uso. Por favor, utilize outro email.';
        res.redirect('/loginPaciente?error=' + encodeURIComponent(errorMessage));
      } else {
        // Se não existe um paciente com o mesmo email, cria o cadastro
        Paciente.create({
          email_paciente: email,
          senha_paciente: req.body.senha_paciente,
        })
          .then(function () {
            const successMessage = 'Paciente cadastrado: ' + email;
            res.redirect('/loginPaciente?success=' + encodeURIComponent(successMessage));
          })
          .catch(function (erro) {
            res.send('Erro ao cadastrar médico!' + erro);
          });
      }
    })
    .catch(function (erro) {
      res.send('Erro ao verificar o email do paciente: ' + erro);
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
        const errorMessage = 'Email ou senha inválidos. Por favor, tente novamente.';
        res.redirect('/loginPaciente?error=' + encodeURIComponent(errorMessage)); // Redireciona com a mensagem de erro na query string
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
            res.render("paginaPaciente", { id_paciente: idPaciente });

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
            res.render("paginaPaciente", { id_paciente: idPaciente });
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
  req.session.idPaciente = idPaciente; // Armazenar o idPaciente na sessão
  res.render("paginaPaciente", { id_paciente: idPaciente });
});

// Rota para exibir as consultas agendadas do paciente
app.get('/consultasAgendadas/:id_paciente', function (req, res) {
  const idPaciente = req.params.id_paciente;
  Consulta.findAll({
    where: {
      fk_id_paciente: idPaciente,
      mes_consulta: { [Op.ne]: null },
      dia_consulta: { [Op.ne]: null },
      horario_consulta: { [Op.ne]: null },
    }
  })
    .then(function (consultas) {
      res.render('consultasAgendadas', { consultas: consultas });
    })
    .catch(function (erro) {
      res.send('Erro ao buscar consultas agendadas: ' + erro);
    });
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
  req.session.idMedicos = idMedicos; // Armazenar o idMedico na sessão
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
  const idMedicos = req.session.idMedicos; // Obter o idMedico da sessão
  res.render('junho', { idConsulta: idConsulta, idMedicos: idMedicos, errorMessage: null, successMessage: null });
});

app.post("/junho", function (req, res) {
  const idConsulta = req.session.idConsulta;
  const idMedicos = req.session.idMedicos;
  const diaConsulta = req.body.diaConsulta;
  const horarioConsulta = req.body.horarioConsulta;

  Consulta.findByPk(idConsulta)
    .then(function (consulta) {
      if (consulta) {
        // Verificar se já existe uma consulta marcada na mesma data, horário e com o mesmo médico
        Consulta.findOne({
          where: {
            dia_consulta: diaConsulta,
            horario_consulta: horarioConsulta,
            fk_id_medicos: idMedicos,
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
                  fk_id_medicos: idMedicos,
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
            fk_id_medicos: idMedicos,
          },
        })
          .then(function (existingConsulta) {
            if (existingConsulta) {
              // Consulta já existe, mostrar uma mensagem de erro
              res.json({ error: "Já existe uma consulta marcada para essa data, horário e médico, tente selecionar outro dia, horário ou médico." });
            } else {
              Consulta.create({
                dia_consulta: diaConsulta,
                horario_consulta: horarioConsulta,
                fk_id_medicos: idMedicos,
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
  const idMedicos = req.session.idMedicos; // Obter o idMedico da sessão
  res.render('julho', { idConsulta: idConsulta, idMedicos: idMedicos, errorMessage: null, successMessage: null });
});

app.post("/julho", function (req, res) {
  const idConsulta = req.session.idConsulta;
  const idMedicos = req.session.idMedicos;
  const diaConsulta = req.body.diaConsulta;
  const horarioConsulta = req.body.horarioConsulta;

  Consulta.findByPk(idConsulta)
    .then(function (consulta) {
      if (consulta) {
        // Verificar se já existe uma consulta marcada na mesma data, horário e com o mesmo médico
        Consulta.findOne({
          where: {
            dia_consulta: diaConsulta,
            horario_consulta: horarioConsulta,
            fk_id_medicos: idMedicos,
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
                  fk_id_medicos: idMedicos,
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
            fk_id_medicos: idMedicos,
          },
        })
          .then(function (existingConsulta) {
            if (existingConsulta) {
              // Consulta já existe, mostrar uma mensagem de erro
              res.json({ error: "Já existe uma consulta marcada para essa data, horário e médico, tente selecionar outro dia, horário ou médico." });
            } else {
              Consulta.create({
                dia_consulta: diaConsulta,
                horario_consulta: horarioConsulta,
                fk_id_medicos: idMedicos,
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
  const idMedicos = req.session.idMedicos; // Obter o idMedico da sessão
  res.render('agosto', { idConsulta: idConsulta, idMedicos: idMedicos, errorMessage: null, successMessage: null });
});

app.post("/agosto", function (req, res) {
  const idConsulta = req.session.idConsulta;
  const idMedicos = req.session.idMedicos;
  const diaConsulta = req.body.diaConsulta;
  const horarioConsulta = req.body.horarioConsulta;

  Consulta.findByPk(idConsulta)
    .then(function (consulta) {
      if (consulta) {
        // Verificar se já existe uma consulta marcada na mesma data, horário e com o mesmo médico
        Consulta.findOne({
          where: {
            dia_consulta: diaConsulta,
            horario_consulta: horarioConsulta,
            fk_id_medicos: idMedicos,
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
                  fk_id_medicos: idMedicos,
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
            fk_id_medicos: idMedicos,
          },
        })
          .then(function (existingConsulta) {
            if (existingConsulta) {
              // Consulta já existe, mostrar uma mensagem de erro
              res.json({ error: "Já existe uma consulta marcada para essa data, horário e médico, tente selecionar outro dia, horário ou médico." });
            } else {
              Consulta.create({
                dia_consulta: diaConsulta,
                horario_consulta: horarioConsulta,
                fk_id_medicos: idMedicos,
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
  const idMedicos = req.session.idMedicos; // Obter o idMedico da sessão
  res.render('setembro', { idConsulta: idConsulta, idMedicos: idMedicos, errorMessage: null, successMessage: null });
});

app.post("/setembro", function (req, res) {
  const idConsulta = req.session.idConsulta;
  const idMedicos = req.session.idMedicos;
  const diaConsulta = req.body.diaConsulta;
  const horarioConsulta = req.body.horarioConsulta;

  Consulta.findByPk(idConsulta)
    .then(function (consulta) {
      if (consulta) {
        // Verificar se já existe uma consulta marcada na mesma data, horário e com o mesmo médico
        Consulta.findOne({
          where: {
            dia_consulta: diaConsulta,
            horario_consulta: horarioConsulta,
            fk_id_medicos: idMedicos,
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
                  fk_id_medicos: idMedicos,
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
            fk_id_medicos: idMedicos,
          },
        })
          .then(function (existingConsulta) {
            if (existingConsulta) {
              // Consulta já existe, mostrar uma mensagem de erro
              res.json({ error: "Já existe uma consulta marcada para essa data, horário e médico, tente selecionar outro dia, horário ou médico." });
            } else {
              Consulta.create({
                dia_consulta: diaConsulta,
                horario_consulta: horarioConsulta,
                fk_id_medicos: idMedicos,
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

// estoque

app.get('/atualizarEstoque', function (req, res) {
  res.sendFile(path.join(__dirname + '/frontend/views/atualizarEstoque.html'));
});


//Receber dados do formulário
app.post('/estoqueCadastrado', function (req, res) {
  const filePath = path.join(__dirname, '../src/frontend/views/estoqueCadastrado');
  fs.readFile(filePath, function (err, content) {

    estoque.create({
      nome_estoque: req.body.nome,
      quant_estoque: req.body.quant,      
    }).then(function () {
      res.render('paginaFuncionario')
    }).catch(function (erro) {
      res.send("Erro ao cadastrar equipamento!" + erro)
    })
  });
});

  //Segunda parte - Listar Produtos  

// Rota para exibir a página de listagem de equipamentos
app.get('/listarEquipamentos', function (req, res) {
  estoque.findAll().then(function (equipamentos) {
    res.render('listarEquipamentos', { equipamentos: equipamentos });
  }).catch(function (erro) {
    res.send('Erro ao buscar equipamentos: ' + erro);
  });
});

// Rota para atualizar a quantidade do equipamento selecionado
app.post('/atualizar_quantidade/:id_estoque', function (req, res) {
  const id_estoque = req.params.id_estoque;
  const novaQuantidade = req.body.quantidade;

  estoque.findByPk(id_estoque).then(function (equipamento) {
    if (equipamento) {
      const quantidadeAnterior = equipamento.quant_estoque;
      const quantidadeAtualizada = parseInt(quantidadeAnterior) + parseInt(novaQuantidade);

      equipamento.update({ quant_estoque: quantidadeAtualizada }).then(function () {
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

//pagamentos

app.get('/pagamento', function (req, res) {
  res.render('pagamento');
});
app.get('/consultasFuncionario', function (req, res) {
  Consulta.findAll({
    where: {
      mes_consulta: { [Op.ne]: null },
      dia_consulta: { [Op.ne]: null },
      horario_consulta: { [Op.ne]: null },
    }
  })
    .then(function (consultas) {
      res.render('consultasFuncionario', { consultas: consultas });
    })
    .catch(function (erro) {
      res.send('Erro ao buscar consultas agendadas: ' + erro);
    });
});

app.get('/cadastroPagamentos/:idConsulta', function (req, res) {
  req.session.idConsulta = req.params.idConsulta; // Armazena o ID da consulta na sessão
  res.render('cadastroPagamentos');
});

app.post('/add-pagamento', function (req, res) {
  const idConsulta = req.session.idConsulta;
  pagamento.create({
      fk_id_consulta: idConsulta,
      data_pagamento: req.body.data_pagamento,
      tipo_pagamento: req.body.tipo_pagamento,
      valor_pagamento: req.body.valor_pagamento,
      possui_plano: req.body.possui_plano
  }).then(function(){
      res.render('paginaFuncionario');
  }).catch(function(er){
      res.send("Erro: Pagamento não foi cadastrado com sucesso." + er)
  })
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

//implementação dos indicadores

// Rota para a implementação dos indicadores

app.get('/pagamentoMaisUsado', function(req, res) {
  sequelize.query(`
  SELECT 
    COUNT(*) AS pacientes_cirurgia,
    (SELECT COUNT(*) FROM prontuarios) AS total_pacientes,
    (COUNT(*) / (SELECT COUNT(*) FROM prontuarios)) * 100 AS porcentagem_cirurgia
  FROM prontuarios
  WHERE cirurgias_prontuario IS NOT NULL
`, {
  type: Sequelize.QueryTypes.SELECT
})
.then(results => {
  console.log('Dados da consulta: ', results);
  // Renderizar o template e enviar os resultados como variáveis
  res.render('pagamentoMaisUsado', { results });
})
.catch(error => {
  console.error('Erro ao executar a consulta: ', error);
  // Envie uma resposta de erro, se necessário
  res.status(500).json({ error: 'Erro ao executar a consulta' });
});
});

app.get('/pagamentosComPlano', function(req, res) {
  sequelize.query(`
    SELECT 
      COUNT(*) AS total_pagamentos,
      SUM(CASE WHEN possui_plano = 1 THEN 1 ELSE 0 END) AS pagamentos_com_plano,
      (SUM(CASE WHEN possui_plano = 1 THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS porcentagem_com_plano
    FROM pagamentos
    WHERE MONTH(data_pagamento) = MONTH(CURRENT_DATE)
  `, {
    type: Sequelize.QueryTypes.SELECT
  })
  .then(results => {
    console.log('Dados da consulta: ', results);
    // Renderize o arquivo pagamentosComPlano.ejs com os dados da consulta
    res.render('pagamentosComPlano', { results });
  })
  .catch(error => {
    console.error('Erro ao executar a consulta: ', error);
    // Envie uma resposta de erro, se necessário
    res.status(500).json({ error: 'Erro ao executar a consulta' });
  });
});

// Rota para a implementação dos indicadores
app.get('/pagamentoTipoMaisFrequente', function(req, res) {
  sequelize.query(`
    SELECT tipo_pagamento, COUNT(*) AS total, (COUNT(*) / (SELECT COUNT(*) FROM mydb.pagamentos)) * 100 AS porcentagem
    FROM mydb.pagamentos
    GROUP BY tipo_pagamento;
  `, {
    type: Sequelize.QueryTypes.SELECT
  })
  .then(results => {
    console.log('Dados da consulta: ', results);
    // Renderizar o arquivo pagamentoTipoMaisFrequente.ejs com os dados da consulta
    res.render('pagamentoTipoMaisFrequente', { results });
  })
  .catch(error => {
    console.error('Erro ao executar a consulta: ', error);
    // Enviar uma resposta de erro, se necessário
    res.status(500).json({ error: 'Erro ao executar a consulta' });
  });
});

// Rota para a implementação dos indicadores
app.get('/pacientesAlergias', function(req, res) {
  sequelize.query(`
    SELECT 
        COUNT(*) AS pacientes_alergias,
        (SELECT COUNT(*) FROM prontuarios) AS total_pacientes,
        (COUNT(*) / (SELECT COUNT(*) FROM prontuarios)) * 100 AS porcentagem_alergias
    FROM prontuarios
    WHERE alergias_prontuario IS NOT NULL AND alergias_prontuario <> '';
  `, {
    type: Sequelize.QueryTypes.SELECT
  })
  .then(results => {
    console.log('Dados da consulta: ', results);
    // Renderizar o arquivo pacientesAlergias.ejs com os dados da consulta
    res.render('pacientesAlergias', { results });
  })
  .catch(error => {
    console.error('Erro ao executar a consulta: ', error);
    // Enviar uma resposta de erro, se necessário
    res.status(500).json({ error: 'Erro ao executar a consulta' });
  });
});

// Rota para a implementação dos indicadores
app.get('/frequenciaHorariosConsulta', function(req, res) {
  sequelize.query(`
    SELECT
        horario_consulta,
        COUNT(*) AS total,
        (COUNT(*) / (SELECT COUNT(*) FROM mydb.consulta)) * 100 AS porcentagem
    FROM
        mydb.consulta
    WHERE
        horario_consulta IN ('12h/13h', '13h/14h', '14h/15h', '15h/16h', '16h/17h', '17h/18h')
    GROUP BY
        horario_consulta;
  `, {
    type: Sequelize.QueryTypes.SELECT
  })
  .then(results => {
    console.log('Dados da consulta: ', results);
    // Renderizar o arquivo frequenciaHorariosConsulta.ejs com os dados da consulta
    res.render('frequenciaHorariosConsulta', { results });
  })
  .catch(error => {
    console.error('Erro ao executar a consulta: ', error);
    // Enviar uma resposta de erro, se necessário
    res.status(500).json({ error: 'Erro ao executar a consulta' });
  });
});

app.get("/indicadores", function(req, res) {
  res.render('indicadores');
})