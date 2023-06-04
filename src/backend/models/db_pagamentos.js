const db = require('./db.js')

const Pagamentos = db.sequelize.define('pagamentos', {
    id_pagamentos: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
      primaryKey: true
    },
    data_pagamento:{
        type: db.Sequelize.DATEONLY
    },
    tipo_pagamento: {
        type: db.Sequelize.STRING
    },
    valor_pagamento: {
        type: db.Sequelize.DOUBLE
    },
    possui_plano: {
        type: db.Sequelize.STRING
    },
    id_agendamento: {
        type: db.Sequelize.INTEGER,
        allowNull: true, // permitir valores nulos
        defaultValue: null // definir o valor padrão como null
    },
}, { 
    timestamps: false
});

    module.exports = Pagamentos;

//Criar a tabela
//Pagamentos.sync({force: true})