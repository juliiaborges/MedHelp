const express = require('express');
const app = express();

app.get("/", async (req,res) => {
    res.send("Teste")
})

app.listen(3000, () => {
    console.log('Servidor ativo')
})