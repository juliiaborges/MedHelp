const db = require("./db");

const paciente = db.sequelize.define(
  "paciente",
  {
    id_paciente: {
      type: db.Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email_paciente: {
      type: db.Sequelize.STRING,
    },
    senha_paciente: {
      type: db.Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

//Criar a tabela
// paciente.sync({force: true})

module.exports = paciente;
