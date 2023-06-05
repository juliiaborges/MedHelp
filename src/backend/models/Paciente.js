const express = require("express");
const app = express();
const {engine} = require("express-handlebars");
const bodyParser = require("body-parser");
const pagamento= require("./db_pagamentos");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { Sequelize, DataTypes } = require('sequelize');

// Configuração da conexão com o banco de dados
const sequelize = new Sequelize('mydb', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

// Definição do modelo da tabela "pacientes"
const Paciente = sequelize.define('Paciente', {
  id_paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email_paciente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha_paciente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Função para salvar o email no banco de dados
async function salvarEmail(email) {
  try {
    await sequelize.sync(); // Cria a tabela no banco de dados, se não existir ainda

    // Cria um novo paciente com o email fornecido
    const paciente = await Paciente.create({
      email_paciente: email,
      senha_paciente: 'senha', // Coloque aqui a senha desejada
    });

    console.log('Email salvo:', paciente.email_paciente);
  } catch (error) {
    console.error('Erro ao salvar o email:', error);
  } finally {
    sequelize.close(); // Fecha a conexão com o banco de dados
  }
}

module.exports = salvarEmail;
