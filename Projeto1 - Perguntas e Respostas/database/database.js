const Sequelize = require('sequelize');

const connection = new Sequelize('perguntas','root','renan123456789',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
