const Sequelize = require("sequelize");
const connection = require("../database/database");
const Curso = require("../cursos/Curso");
const Aluno = require("../alunos/Aluno");

const Materia = connection.define('materias',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },day:{
        type: Sequelize.STRING,
        allowNull: false
    },hour:{
        type: Sequelize.STRING,
        allowNull: false
    },local:{
        type: Sequelize.STRING,
        allowNull: false
    },
    resume:{
        type: Sequelize.TEXT,
        allowNull:false
    }

});

//Curso.hasMany(Materia);
Materia.belongsTo(Curso);

//Materia.sync({force:true});

module.exports = Materia;