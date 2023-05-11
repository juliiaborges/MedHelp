const db = require("./db_estoque");

const estoque = db.sequelize.define(
  "estoque",
  {
    id_equipamento: {
      type: db.Sequelize.DOUBLE,
      autoIncrement: true,
      primaryKey: true,
    },
    nome_equipamento: {
      type: db.Sequelize.STRING,
    },
    quant_Equipamento: {
      type: db.Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

//Criar a tabela
// Estoque.sync({force: true})

module.exports = estoque;