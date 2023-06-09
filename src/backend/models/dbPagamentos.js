const db = require('./db.js')

const Pagamentos = db.sequelize.define('pagamentos', {
    id_pagamentos: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fk_id_consulta: {
        type: db.Sequelize.INTEGER,
    },
    data_pagamento:{
        type: db.Sequelize.DATE
    },
    tipo_pagamento: {
        type: db.Sequelize.STRING
    },
    valor_pagamento: {
        type: db.Sequelize.DOUBLE
    },
    possui_plano: {
        type: db.Sequelize.STRING
    }
}, { 
    timestamps: false
});

    module.exports = Pagamentos;

//Criar a tabela
//Pagamentos.sync({force: true})
