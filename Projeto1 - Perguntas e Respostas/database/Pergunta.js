const Sequelize = require("sequelize");
const connection = require("./database");

//Criando um model --> definindo uma tabela no nosso database
const Pergunta = connection.define('perguntas',{
    titulo:{ //Campos da nossa tabela / atributos
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type:Sequelize.TEXT,
        allowNull: false
    }
},{});

Pergunta.sync({force:false}).then(()=>{});

module.exports = Pergunta;