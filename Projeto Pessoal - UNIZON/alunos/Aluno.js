const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("../users/User");
const Curso = require("../cursos/Curso");
const Materia = require("../materias/Materia");
const AlunoMateria = require("./Aluno_Materia");

const Aluno = connection.define('alunos',{
    RA:{
        type: Sequelize.STRING,
        allowNull:false
    }
});

Aluno.belongsTo(User);

//Curso.hasMany(Aluno);
Aluno.belongsTo(Curso);

//Aluno.sync({force:true});

module.exports = Aluno;