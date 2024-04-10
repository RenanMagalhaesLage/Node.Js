const Sequelize = require("sequelize");
const connection = require("../database/database");

const Admin = connection.define('admins',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },email:{
        type: Sequelize.STRING,
        allowNull: false
    },password:{
        type: Sequelize.STRING,
        allowNull:false
    }
});

//Admin.sync({force:true});

module.exports = Admin;