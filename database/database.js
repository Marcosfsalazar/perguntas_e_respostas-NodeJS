const Sequelize = require('sequelize');
const CONFIG = require('./config.json')

const dbPass = CONFIG.dbPass;

const connection = new Sequelize('guiaperguntas','root',dbPass,{
    host:'localhost',
    dialect:'mysql'
});

module.exports = connection;