//Configurando o Database
const Sequelize = require("sequelize");
const connection = new Sequelize('blog', 'root', 'renan123456789',{//nome do banco, usuário, senha
    host:'localhost',
    dialect:'mysql',
    timezone: '-3:00'
}); 

module.exports = connection;