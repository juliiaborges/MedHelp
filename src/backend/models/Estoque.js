const db = require("./db");

const estoque = db.sequelize.define(
  "estoque",
  {
    id_estoque: {
      type: db.Sequelize.DOUBLE,
      autoIncrement: true,
      primaryKey: true,
    },
    nome_estoque: {
      type: db.Sequelize.STRING,
    },
    quant_estoque: {
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