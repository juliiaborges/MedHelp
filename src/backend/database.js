const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser')

//Criar o app express
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

//Configuração do banco de dados
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "123456", 
  database: "mydb"
});

con.connect((error) => {
  if (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error);
  } else {
    console.log('Conexão bem sucedida!');
  }
});

//Rota do Envio do Formulário

app.post('/cadastro', (req, res) => {
  const nome = req.body.nome;
  const uf = req.body.uf;
  const crm = req.body.crm;
  const especialidade = req.body.especialidade;
  const situacao = req.body.situacao;
  const telefone = req.body.telefone;
  const email = req.body.email;
  const query = `INSERT INTO medicos (nome, uf, crm, especialidade, situacao, telefone, email ) VALUES ('${nome}','${uf}', '${crm}', '${especialidade}', '${situacao}', '${telefone}', '${email}')`;

  con.query(query, (err, result) => {
    if (err) {
      res.send('Erro ao cadastrar usuário.');
    } else {
      res.send('Usuário cadastrado com sucesso!');
    }
  });
});


//   con.query(query, (error, results) => {
//     if (error) throw error;
//     console.log(`Médico cadastrado com sucesso: ${nome}`);
//     res.send(`Médico cadastrado com sucesso: ${nome}`);
//   });
 //});


/*const query = 'INSERT INTO medicos (nome, uf, crm, especialidade, situacao, telefone, email ) VALUES (?, ?, ?, ?, ?, ?, ?)';
const values = [nome, uf, crm, especialidade, situacao, telefone, email];
con.query(query, values, (error, results) => {
 if (error) {
   res.send('Erro ao cadastrar médico.');
 } else {
   res.send('Médico cadastrado com sucesso!');
 }
});*/