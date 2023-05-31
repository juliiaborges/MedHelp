const express = require("express");
const app = express();
const {engine} = require("express-handlebars");
const bodyParser = require("body-parser");
const pagamento= require("./db_pagamentos");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('views', '../../frontend/views');
app.set('view engine', 'handlebars');

//Rotas
app.get('/pagamento', function (req, res) {
    res.render('pagamento');
});

app.get('/cad-pagamento', function (req, res) {
    res.render('cad-pagamento');
});
app.post('/add-pagamento', function(req, res){
    pagamento.create({
        data_pagamento: req.body.data_pagamento,
        tipo_pagamento: req.body.tipo_pagamento,
        valor_pagamento: req.body.valor_pagamento,
        possui_plano: req.body.possui_plano
    }).then(function(){
        res.send("Pagamento cadastrado com sucesso!")
    }).catch(function(er){
        res.send("Erro: Pagamento não foi cadastrado com sucesso." + er)
    })
   //res.send("Data de pagamento: " + req.body.data_pagamento + "<br>Tipo de pagamento: " + req.body.tipo_pagamento + "<br>Valor do pagamento: " + req.body.valor_pagamento + "<br>") 
})

app.listen(8080);

console.log('Conectado');