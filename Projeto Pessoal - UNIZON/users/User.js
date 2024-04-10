const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define('users',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },lastName:{
        type: Sequelize.STRING,
        allowNull: false
    },email:{
        type: Sequelize.STRING,
        allowNull: false
    },password:{
        type: Sequelize.STRING,
        allowNull:false
    },cellphone:{
        type: Sequelize.STRING,
        allowNull:false
    },sex:{
        type: Sequelize.STRING,
        allowNull:false
    },birthday:{
        type: Sequelize.DATEONLY,
        allowNull:false,
        defaultValue: Sequelize.NOW
    },age:{
        type: Sequelize.INTEGER,
        allowNull:false
    },street: {
        type: Sequelize.STRING,
        allowNull: false
    },streetNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },neighborhood:{
        type: Sequelize.STRING,
        allowNull: false
    },city: {
        type: Sequelize.STRING,
        allowNull: false
    },state: {
        type: Sequelize.STRING,
        allowNull: false
    },photoNumber:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

//User.sync({force:true});

module.exports = User;