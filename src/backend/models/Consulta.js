const db = require("./db");

const consulta = db.sequelize.define(
  "consulta",
  {
    id_consulta: {
      type: db.Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fk_id_medicos: {
      type: db.Sequelize.INTEGER,
    },
    fk_id_paciente:{
      type: db.Sequelize.INTEGER,
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