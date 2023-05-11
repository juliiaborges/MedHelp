// const mysql = require('mysql2');
// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path'); // Importar o módulo path

// //Criar o app express
// const app = express();


// app.use(bodyParser.urlencoded({ extended: false }));

// //Configuração do banco de dados
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   port: "3306",
//   password: "123456", 
//   database: "mydb"
// });
// con.connect((error) => {
//   if (error) {
//     console.error('Erro ao conectar-se ao banco de dados:', error);
//   } else {
//     console.log('Conexão bem sucedida!');
//   }
// });

// //Rota do Envio do Formulário

// app.post('../frontend/scripts/cadastroMedicos.js', (req, res) => {
//   const nome = req.body.nome;
//   const uf = req.body.uf;
//   const crm = req.body.crm;
//   const especialidade = req.body.especialidade;
//   const situacao = req.body.situacao;
//   const telefone = req.body.telefone;
//   const email = req.body.email;
//   const query = `INSERT INTO medicos (nome_medico ,especialidade_medico, telefone_medico, email_medico,  uf_medico, crm_medico, situacao_medico ) VALUES ('${nome}', '${especialidade}', '${telefone}', '${email}','${uf}', '${crm}', '${situacao}')`;
//   console.log(query)
//   con.query(query, (err, result) => {
//     if (err) {
//       console.error('Erro ao cadastrar usuário:', err.message);
//       res.send('Erro ao cadastrar usuário.');
//     } else {
//       res.send('Usuário cadastrado com sucesso!');
//     }
//   });
  
// });
// app.use(express.json());
// app.listen(3000, () => {
//   console.log ('Servidor foi iniciado')
// })
// app.use(express.static(path.join(__dirname, '../frontend')));

// app.get('/cadastroMedicos', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/views/cadastroMedicos.html'));
// });




// //   con.query(query, (error, results) => {
// //     if (error) throw error;
// //     console.log(`Médico cadastrado com sucesso: ${nome}`);
// //     res.send(`Médico cadastrado com sucesso: ${nome}`);
// //   });
//  //});


// /*const query = 'INSERT INTO medicos (nome, uf, crm, especialidade, situacao, telefone, email ) VALUES (?, ?, ?, ?, ?, ?, ?)';
// const values = [nome, uf, crm, especialidade, situacao, telefone, email];
// con.query(query, values, (error, results) => {
//  if (error) {
//    res.send('Erro ao cadastrar médico.');
//  } else {
//    res.send('Médico cadastrado com sucesso!');
//  }
// });*/