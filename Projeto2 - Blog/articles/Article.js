const Sequelize = require("sequelize");
const connection = require("../database/database");

//CRIANDO UM RELACIONAMENTO ENTRE TABELAS DO BANCO DE DADOS
const Category = require("../categories/Category"); //Importanto o model que desejamos fazer o relacionamento


const Article = connection.define('articles',{ //Definindo uma tabela no banco de dados
    title:{
        type: Sequelize.STRING,
        allowNull:false
    },slug:{
        type: Sequelize.STRING,
        allowNull:false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull:false
    }
})

Category.hasMany(Article); //Relacionamento um para muitos --> uma categoria tem muitos artigos
Article.belongsTo(Category); //Relacionamento um para um 

//Article.sync({force:true}); //Sincronizando com o database (excluir essa linha depois de executar pela primeira vez)

module.exports = Article;