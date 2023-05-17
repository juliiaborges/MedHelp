const db = require('./db')

const Medicos = db.sequelize.define('medicos', {
    id_medicos: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email_medico: {
        type: db.Sequelize.STRING
    },
    especialidade_medico: {
        type: db.Sequelize.STRING
    },
    nome_medico: {
        type: db.Sequelize.STRING
    },
    telefone_medico: {
        type: db.Sequelize.STRING
    },
    uf_medico: {
        type: db.Sequelize.STRING
    },
    crm_medico: {
        type: db.Sequelize.DOUBLE
    },
    situacao_medico: {
        type: db.Sequelize.STRING
    },
    dia_disponivel: {
        type: db.Sequelize.STRING
    },
    horario_disponivel_inicio: {
        type: db.Sequelize.STRING
    },
    horario_disponivel_fim: {
        type: db.Sequelize.STRING
    },
    agendamento_id_agendamento: {
        type: db.Sequelize.INTEGER,
        allowNull: true, // permitir valores nulos
        defaultValue: null // definir o valor padrão como null
    }
}, {
    timestamps: false
});

//Criar a tabela
// Medicos.sync({force: true})

module.exports = Medicos;