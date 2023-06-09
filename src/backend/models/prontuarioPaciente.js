const db = require("./db");

const prontuario = db.sequelize.define(
    "prontuario",
    {
    id_prontuario: {
        type: db.Sequelize.INTEGER,
        primaryKey: true
        },
    fk_id_paciente: {
        type: db.Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
        },
    observacoes_prontuario: {
        type: db.Sequelize.STRING,
        allowNull: true,
        defaultValue: null
        },
    cpf_prontuario: {
        type: db.Sequelize.INTEGER
    },
    nome_prontuario:{
        type: db.Sequelize.STRING,
    },
    data_nascimento_prontuario:{
        type: db.Sequelize.DATE,
    },
    telefone_prontuario:{
        type: db.Sequelize.STRING,
    },
    alergias_prontuario:{
        type: db.Sequelize.STRING,
    },
    cirurgias_prontuario:{
        type: db.Sequelize.STRING,
    }
    }, {
    timestamps: false,
});

//Criar a tabela
// Prontuario.sync({force: true})

module.exports = prontuario;