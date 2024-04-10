const Sequelize = require("sequelize");
const connection = require("../database/database");

const Curso = connection.define('cursos',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },numberSemesters:{
        type: Sequelize.INTEGER,
        allowNull:false
    }
});

//Curso.hasMany(Professor);

//Curso.hasMany(Materia);
//Materia.belongsTo(Curso);

//Curso.hasMany(Professor);
//Professor.belongsTo(Curso);

//Curso.hasMany(Aluno);
//Aluno.belongsTo(Curso);

//Curso.sync({force:true});

module.exports = Curso;