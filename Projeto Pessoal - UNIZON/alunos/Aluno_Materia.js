const Sequelize = require("sequelize");
const connection = require("../database/database");

const AlunoMateria = connection.define('aluno_materia', {
    idAluno:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    idMateria:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
});


//AlunoMateria.sync({force:true});

module.exports = AlunoMateria;