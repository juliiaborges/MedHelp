const db = require('./db')

const Medicos = db.sequelize.define('medicos',{
    id_medicos: {
        type: db.Sequelize.DOUBLE,
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
        type: db.Sequelize.DOUBLE
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