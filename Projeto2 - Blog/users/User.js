const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define('users',{ //Definindo uma tabela no banco de dados
    email:{
        type: Sequelize.STRING,
        allowNull:false
    },password:{
        type: Sequelize.STRING,
        allowNull:false
    }
})

//User.sync({force:false}); //Sincronizando com o database (excluir essa linha depois de executar pela primeira vez)

module.exports = User;