const { Sequelize, QueryTypes } = require('sequelize');
const pagamentos = require("./backend/models/Pagamentos");
const sequelize = new Sequelize('mydb', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

class PagamentosController {
  async tipoPagamentoMaisFrequente(req, res) {
    try {
      const query = `
        SELECT tipo_pagamento, COUNT(* ) AS total, (COUNT(*) / (SELECT COUNT( *) FROM pagamentos)) * 100 AS porcentagem
        FROM pagamentos
        GROUP BY tipo_pagamento
        ORDER BY total DESC
        LIMIT 1;
      `;
      const result = await sequelize.query(query, { type: QueryTypes.SELECT });
      const tipoPagamentoMaisFrequente = result[0];

      return res.status(200).json(tipoPagamentoMaisFrequente);
    } catch (error) {
      return res.status(500).json('Erro ao obter tipo de pagamento mais frequente: ' + error);
    }
  }

  async porcentagemTipoPagamento(req, res) {
    try {
      const query = `
        SELECT tipo_pagamento, COUNT(* ) AS total, (COUNT(* ) / (SELECT COUNT(*) FROM pagamentos)) * 100 AS porcentagem
        FROM pagamentos
        GROUP BY tipo_pagamento;
      `;
      const result = await sequelize.query(query, { type: QueryTypes.SELECT });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json('Erro ao obter porcentagem de tipos de pagamento: ' + error);
    }
  }
}

module.exports = new PagamentosController()