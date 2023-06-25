const db = require('./db')

const Funcionario = db.sequelize.define('funcionario', {
    
    id_funcionario: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email_funcionario: {
        type: db.Sequelize.STRING
    },
    senha_funcionario:{
        type: db.Sequelize.STRING,
    },
}, {
    tableName: 'funcionario',
    timestamps: false
});

//Criar a tabela
// Funcionario.sync({force: true})

module.exports = Funcionario;