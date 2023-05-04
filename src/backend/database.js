const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: localhost,
    port: 3000,
});

connection.connect((err) => {
    if (err){
        console.error('Erro ao realizar conexão com o banco de dados!!!')
         return
    } 
    else {
        console.log('Conexão com bando de dados foi realizada', 'color: #1ee010');
    }
})