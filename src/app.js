const express = require("express");
const app = express ();
const handlebars = require ("express-handlebars");
const bodyParser = require("body-parser")
const medicos = require("../src/backend/models/Medicos")

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//Rotas

app.get('/cadastro_medicos', function(req, res){
  res.render('cadastro_medicos');
});

app.post('/add_medicos', function(req, res){
  medicos.create({

    nome_medico: req.body.nome_medico,
    email_medico: req.body.email_medico,
    especialidade_medico: req.body.especialidade_medico,
    telefone_medico: req.body.telefone_medico,
    uf_medico:req.body.uf_medico,
    crm_medico:req.body.crm_medico,
    situacao_medico:req.body.situacao_medico

  }).then(function(){
    res.send("Medico cadastrado com sucesso!")
  }).catch(function(erro){
    res.send("Erro: Medico não foi cadastrado com sucesso!" + erro)
  })
  //res.send("Nome: " + req.body.nome + "<br>Valor: " + req.body.valor + "<br>")  
});


app.listen(3000);