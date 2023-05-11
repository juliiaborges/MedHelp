const db = require('../models/db')

const Medicos = db.sequelize.define('medicos',{
    id_medico: {
        type: db.Sequelize.STRING,
        autoIncrement: true,
        primaryKey: true
    },
    email_medico:{
        type: db.Sequelize.STRING
    },
    especialidade_medico:{
        type: db.Sequelize.STRING
    },
    nome_medico:{
        type: db.Sequelize.STRING
    },
    telefone_medico:{
        type: db.Sequelize.STRING
    },
    uf_medico:{
        type: db.Sequelize.STRING
    },
    crm_medico:{
        type: db.Sequelize.STRING
    },
    situacao_medico:{
        type: db.Sequelize.STRING
    }
    }, {
    timestamps: false
});

//Criar a tabela
// Medicos.sync({force: true})

module.exports = Medicos;