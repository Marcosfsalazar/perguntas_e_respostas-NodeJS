const Sequelize = require('sequelize');
const CONFIG = require('config.json')

const dbPass = CONFIG.dbPass;

const connection = new Sequelize('guiaperguntas')