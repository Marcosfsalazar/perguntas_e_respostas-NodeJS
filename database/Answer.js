const Sequelize = require('sequelize');
const connection =require('./database');

//definindo a tabela respostas
const Answer = connection.define('answer',{
    content:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull:false
    }
});

Answer.sync({force:false});

module.exports = Answer;