const db = require("./db");

const consulta = db.sequelize.define(
  "consulta",
  {
    id_consulta: {
      type: db.Sequelize.DOUBLE,
      autoIncrement: true,
      primaryKey: true,
    },
    medicos_id_medicos: {
      type: db.Sequelize.DOUBLE,
    },
    horarios_consulta: {
      type: db.Sequelize.STRING,
    },
    paciente_cpf_paciente: {
      type: db.Sequelize.STRING,
    },
    dia_consulta: {
      type: db.Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

//Criar a tabela
// consulta.sync({force: true})

module.exports = consulta;