const db = require("./db_prontuarioPaciente");

const Paciente = db.sequelize.define(
    "paciente",
    {
    cpf_paciente: {
        type: db.Sequelize.DOUBLE,
        primaryKey: true
    },
    nome_paciente:{
        type: db.Sequelize.STRING,
    },
    data_nascimento_paciente:{
        type: db.Sequelize.DOUBLE,
    },
    
    alergias_paciente:{
        type: db.Sequelize.STRING,
    },
    cirurgias_paciente:{
        type: db.Sequelize.STRING,
    },
    telefone_paciente:{
        type: db.Sequelize.DOUBLE,
    },
    possui_plano:{
        type: db.Sequelize.STRING,
    },
    }, {
    timestamps: false,
});

//Criar a tabela
// Paciente.sync({force: true})

module.exports = Paciente;