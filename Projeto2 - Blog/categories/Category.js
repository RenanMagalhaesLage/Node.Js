const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define('categories',{ //Definindo uma tabela no banco de dados
    title:{
        type: Sequelize.STRING,
        allowNull:false
    },slug:{
        type: Sequelize.STRING,
        allowNull:false
    }
})

//Category.sync({force:true}); //Sincronizando com o database (excluir essa linha depois de executar pela primeira vez)

module.exports = Category;