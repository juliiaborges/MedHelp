const db = require("./db");

const consulta = db.sequelize.define(
  "consulta",
  {
    id_consulta: {
      type: db.Sequelize.DOUBLE,
      autoIncrement: true,
      primaryKey: true,
    },
    fk_id_medicos: {
      type: db.Sequelize.DOUBLE,
    },
    fk_id_paciente:{
      type: db.Sequelize.DOUBLE,
    },
    mes_consulta:{
      type: db.Sequelize.STRING,
    },
    dia_consulta: {
      type: db.Sequelize.STRING,
      allowNull: true, // permitir valores nulos
      defaultValue: null // definir o valor padrão como null
    },
    horario_consulta: {
      type: db.Sequelize.STRING,
      allowNull: true, // permitir valores nulos
      defaultValue: null // definir o valor padrão como null
    },
  },
  {
    timestamps: false,
  });


//Criar a tabela
// consulta.sync({force: true})

module.exports = consulta;