const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("../users/User");
const Curso = require("../cursos/Curso");

const Professor = connection.define('professores',{
    title:{
        type: Sequelize.STRING,
        allowNull:false
    },
    salary:{
        type: Sequelize.DECIMAL(10, 2), // Exemplo de tipo de dados para representar um valor monetário
        allowNull: false
    }
});

Professor.belongsTo(User, { onDelete: 'CASCADE' });

//Curso.hasMany(Professor);
Professor.belongsTo(Curso);

//Professor.sync({force:true});

module.exports = Professor;