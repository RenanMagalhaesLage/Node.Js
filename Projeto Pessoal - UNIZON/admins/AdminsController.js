const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../users/User");
const Aluno = require("../alunos/Aluno");
const Professor = require("../professores/Professor");
const Curso = require("../cursos/Curso");
const Materia = require("../materias/Materia");

const moment = require('moment');
require('moment-duration-format');

function calcularIdade(dataNascimento) {
    const hoje = moment();
    const nascimento = moment(dataNascimento, 'YYYY/MM/DD'); 
    const idade = moment.duration(hoje.diff(nascimento)).years();
    return idade;
}

router.get("/admin", (req,res)=>{
    res.render("admin/index");
});

/* =================================Rotas de Matéria================================= */
//Rota para listar todos as matérias
router.get("/admin/materia", (req,res)=>{
    Materia.findAll({
        include:[{model:Curso}]
    }).then(materias =>{
        res.render("admin/materia", {materias:materias});
    });
});

//Rota para editar as matérias
router.get("/admin/materia/edit/:id", (req,res)=>{
    var id = req.params.id;
    if(isNaN(id)){
        res.redirect("admin/materia");
    }

    Materia.findByPk(id).then(materia =>{
        if(materia != undefined){
            Curso.findAll({})
            .then(cursos =>{
                res.render("admin/editMateria", {materia:materia, cursos:cursos});
            });
        }else{
            res.redirect("admin/materia");
        }
    }).catch(error => {
        console.error("Erro ao buscar matéria:", error);
        res.redirect("admin/materia");
    });
});
//Rota para o envio da edição de matérias
router.post("/materia/update/:id",(req,res)=>{
    var id = req.params.id;
    var name = req.body.name;
    var cursoId = req.body.course;
    var day = req.body.day;
    var hour = req.body.hour;
    var local = req.body.local;
    var resume = req.body.resume;

    Materia.update({
        name: name,
        day:day,
        hour:hour,
        local:local,
        resume:resume,
        cursoId: cursoId,
    },{
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/materia");
    });
});

//Rota para preenchimento do formulário de cadastro de matérias
router.get("/admin/materia/create", (req,res)=>{
    Curso.findAll({})
    .then(cursos =>{
        res.render("forms/materia", {cursos:cursos});
    });
});
//Rota para envio do formulário de cadastro de matérias
router.post("/materia/create",async (req,res)=>{
    var name = req.body.name;
    var cursoId = req.body.course;
    var day = req.body.day;
    var hour = req.body.hour;
    var local = req.body.local;
    var resume = req.body.resume;
    
    Materia.create({
        name: name,
        day:day,
        hour:hour,
        local:local,
        resume:resume,
        cursoId: cursoId,
    }).then(()=>{
        res.redirect("/admin/materia");
    });
});

//Rota para deletar matéria
router.post("/materias/delete/:id",(req,res)=>{
    var id = req.params.id;
    if(id != undefined){
        if(!isNaN(id)){//verificando se é um número
            Materia.destroy({ //Deletando uma categoria que o id foi passado
                where:{
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/materia");
            })
        }else{
            res.redirect("/admin/materia");
        }
    }else{
        res.redirect("/admin/materia");
    }
});

/* =================================Rotas de Curso================================= */
//Rota para listar todos os cursos
router.get("/admin/curso", (req,res)=>{
    Curso.findAll({
    }).then(cursos =>{
        res.render("admin/curso", {cursos:cursos});
    });
});

//Rota para editar os cursos
router.get("/admin/curso/edit/:id", (req,res)=>{
    var id = req.params.id;
    if(isNaN(id)){
        res.redirect("admin/curso");
    }

    Curso.findByPk(id).then(curso =>{
        if(curso != undefined){
            res.render("admin/editCurso", {curso:curso});
        }else{
            res.redirect("admin/curso");
        }
    }).catch(error => {
        console.error("Erro ao buscar curso:", error);
        res.redirect("admin/curso");
    });
});
//Rota para o envio da edição de cursos
router.post("/curso/update/:id",(req,res)=>{
    var id = req.params.id;
    var name = req.body.name;
    var numberSemesters = req.body.numberSemesters;

    Curso.update({
        name: name,
        numberSemesters: numberSemesters,
    },{
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/curso");
    });
});

//Rota para preenchimento do formulário de cadastro de cursos
router.get("/admin/curso/create", (req,res)=>{
    res.render("forms/curso");
});
//Rota para envio do formulário de cadastro de cursos
router.post("/curso/create",async (req,res)=>{
    var name = req.body.name;
    var numberSemesters = req.body.numberSemesters;
    
    Curso.create({
        name: name,
        numberSemesters: numberSemesters
    }).then(()=>{
        res.redirect("/admin/curso");
    });
});
//Rota para deletar curso
router.post("/curso/delete/:id",(req,res)=>{
    var id = req.params.id;
    if(id != undefined){
        if(!isNaN(id)){//verificando se é um número
            Curso.destroy({ //Deletando uma categoria que o id foi passado
                where:{
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/curso");
            })
        }else{
            res.redirect("/admin/curso");
        }
    }else{
        res.redirect("/admin/curso");
    }
});


/* =================================Rotas de Professor================================= */
//Rota para listar todos os professores
router.get("/admin/professor", (req,res)=>{
    Professor.findAll({
        include: [
            { model: User},{ model: Curso}
        ] //Fazendo join com a tabela User
    }).then(professores =>{
        Curso.findAll({}).then(cursos=>{
            res.render("admin/professor", {professores: professores, cursos:cursos});
        })
    });
});

//Rota para editar os professores
router.get("/admin/professor/edit/:id", (req,res)=>{
    var id = req.params.id;
    if(isNaN(id)){
        res.redirect("admin/professor");
    }

    Professor.findByPk(id, {include: [{ model: User }]}).then(professor =>{
        if(professor != undefined){
            Curso.findAll({}).then(cursos=>{
                res.render("admin/editProfessor", {professor:professor, cursos:cursos});
            })
        }else{
            res.redirect("admin/professor");
        }
    }).catch(error => {
        console.error("Erro ao buscar professor:", error);
        res.redirect("admin/professor");
    });
});

//Rota para o envio da edição de professores
router.post("/professor/update/:id",(req,res)=>{
    var id = req.params.id;
    var name = req.body.name;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var cellphone = req.body.cellphone;
    var sex = req.body.sex;
    var birthdate = req.body.birthdate;
    var cursoId = req.body.course;
    console.log("CURSO: ",cursoId);
    var street = req.body.street;
    var streetNumber = req.body.streetNumber;
    var neighborhood = req.body.neighborhood;
    var city = req.body.city;
    var state = req.body.state;

    var title = req.body.title;
    var salary = req.body.salary;

    const idade = calcularIdade(birthdate);

    User.update({
        name: name,
        lastName: lastName,
        email: email,
        cellphone: cellphone,
        sex: sex,
        birthday: birthdate,
        age:idade,
        street:street,
        streetNumber:streetNumber,
        neighborhood:neighborhood,
        city:city,
        state:state,
    },{
        where: {
            id: id
        }
    }).then(()=>{
        Professor.update({
            // Adicione os campos do modelo Professor que você deseja atualizar aqui
            title: title,
            salary: salary,
            cursoId: cursoId
        }, {
            where: {
                userId: id // Use o ID do usuário para encontrar o professor associado
            }
        }).then(() => {
            res.redirect("/admin/professor");
        }).catch(error => {
            console.error("Erro ao atualizar professor:", error);
            res.status(500).send("Erro ao atualizar professor");
        });
    }).catch(error => {
        console.error("Erro ao atualizar professor:", error);
        res.status(500).send("Erro ao atualizar professor");
    });
});

//Rota para preenchimento do formulário de cadastro de professor
router.get("/admin/professor/create", (req,res)=>{
    Curso.findAll({})
    .then(cursos =>{
        res.render("forms/professor", {cursos:cursos});
    });
});

//Rota para envio do formulário de cadastro de professor
router.post("/professor/create",async (req,res)=>{
    var name = req.body.name;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    var cellphone = req.body.cellphone;
    var sex = req.body.sex;
    var birthdate = req.body.birthdate;
    var course = req.body.course;
    var street = req.body.street
    var streetNumber = req.body.streetNumber
    var neighborhood = req.body.neighborhood
    var city = req.body.city
    var state = req.body.state

    var title = req.body.title;
    var salary = req.body.salary;

    //Calculando a Idade
    const idade = calcularIdade(birthdate);
    User.create({
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        cellphone: cellphone,
        sex: sex,
        birthday: birthdate,
        age:idade,
        street:street,
        streetNumber:streetNumber,
        neighborhood:neighborhood,
        city:city,
        state:state,
        photoNumber: 0,
    }).then(newUser => {
        //Criando um Professor
        const userId = newUser.id;
    
        Professor.create({
            title: title,
            salary: salary,
            userId: userId,
            cursoId: course
        }).then(newProfessor=> {
            console.log('\x1b[32m%s\x1b[0m','PROFESSOR CRIADO COM SUCESSO!!');
            res.redirect("/admin/professor");
        }).catch(err => {
            console.error("\x1b[31m",'Erro ao criar Professor:', err);
        });
    }).catch(err => {
        console.error("\x1b[31m",'Erro ao criar Usuário:', err);
    });
});

//Rota para deletar professor
router.post("/professor/delete/:id", async(req,res)=>{
    var userId = req.params.id;
    if(userId != undefined){
        if(!isNaN(userId)){//verificando se é um número
            try {
                // Excluir o professor, o usuário associado será excluído automaticamente
                await Professor.destroy({
                    where: {
                        userId: userId
                    }
                }),
                User.destroy({
                    where:{
                        id:userId
                    }
                })
                res.redirect("/admin/professor");
            } catch (error) {
                console.error("Erro ao excluir professor:", error);
                res.redirect("/admin/professor");
            }
        } else {
            res.redirect("/admin/professor");
        }
    } else {
        res.redirect("/admin/professor");
    }
});


/* =================================Rotas de Aluno================================= */

//Rota para listar todos os alunos
router.get("/admin/aluno", (req,res)=>{
    Aluno.findAll({
        include: [{ model: User }] //Fazendo join com a tabela User
    }).then(alunos =>{
        res.render("admin/aluno", {alunos: alunos});
    });
});

//Rota para editar os alunos
router.get("/admin/aluno/edit/:id", (req,res)=>{
    var id = req.params.id;
    if(isNaN(id)){
        res.redirect("admin/aluno");
    }

    Aluno.findByPk(id, {include: [{ model: User }]}).then(aluno =>{
        if(aluno != undefined){
            res.render("admin/editAluno", {aluno:aluno});
        }else{
            res.redirect("admin/aluno");
        }
    }).catch(error => {
        console.error("Erro ao buscar aluno:", error);
        res.redirect("admin/aluno");
    });
});

//Rota para o envio da edição de aluno
router.post("/aluno/update/:id",(req,res)=>{
    var id = req.params.id;
    var name = req.body.name;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    var cellphone = req.body.cellphone;
    var sex = req.body.sex;
    var birthdate = req.body.birthdate;
    var cursoId = req.body.course;
    var street = req.body.street
    var streetNumber = req.body.streetNumber
    var neighborhood = req.body.neighborhood
    var city = req.body.city
    var state = req.body.state

    const idade = calcularIdade(birthdate);

    User.update({
        name: name,
        lastName: lastName,
        email: email,
        cellphone: cellphone,
        sex: sex,
        birthday: birthdate,
        age:idade,
        street:street,
        streetNumber:streetNumber,
        neighborhood:neighborhood,
        city:city,
        state:state,
    },{
        where: {
            id: id
        }
    }).then(()=>{
        Aluno.update({
            cursoId: cursoId
        }, {
            where: {
                userId: id // Use o ID do usuário para encontrar o professor associado
            }
        }).then(() => {
            res.redirect("/admin/aluno");
        }).catch(error => {
            console.error("Erro ao atualizar aluno:", error);
            res.status(500).send("Erro ao atualizar aluno");
        });
    }).catch(error => {
        console.error("Erro ao atualizar aluno:", error);
        res.status(500).send("Erro ao atualizar aluno");
    });
});

//Rota para preenchimento do formulário de cadastro de aluno
router.get("/admin/aluno/create", (req,res)=>{
    Curso.findAll({})
    .then(cursos =>{
        res.render("forms/aluno", {cursos:cursos});
    });
});

//Rota para envio do formulário de cadastro de aluno
router.post("/aluno/create",async (req,res)=>{
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    try {
        // Consulta para encontrar o último ID cadastrado
        const ultimoUsuario = await Aluno.findOne({
            order: [
                ['id', 'DESC'] // Ordena em ordem decrescente pelo ID
            ],
            attributes: ['id'], // Atributo a ser selecionado
            limit: 1 // Limita o resultado a 1 registro
        });

        // Verifica se encontrou um usuário e obtém o ID
        let ultimoID;
        if (ultimoUsuario) {
            ultimoID = ultimoUsuario.id;
        } else {
            ultimoID = 0; // Caso não haja nenhum usuário cadastrado ainda
        }

        var name = req.body.name;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var password = req.body.password;
        var cellphone = req.body.cellphone;
        var sex = req.body.sex;
        var birthdate = req.body.birthdate;
        var course = req.body.course;
        var street = req.body.street
        var streetNumber = req.body.streetNumber
        var neighborhood = req.body.neighborhood
        var city = req.body.city
        var state = req.body.state
        var ra = (anoAtual + ".0." + course + "."+ ultimoID);
        //res.json({ name, lastName, email, password, cellphone, sex, birthdate, course, ra });
    } catch (error) {
        console.error('Erro ao buscar o último ID:', error);
        //res.status(500).json({ message: 'Erro ao buscar o último ID.' });
    }

    //Calculando a Idade
    const idade = calcularIdade(birthdate);
    User.create({
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        cellphone: cellphone,
        sex: sex,
        birthday: birthdate,
        age:idade,
        street:street,
        streetNumber:streetNumber,
        neighborhood:neighborhood,
        city:city,
        state:state,
        photoNumber: 0 
    }).then(newUser => {
        //Criando um aluno
        const userId = newUser.id;
    
        Aluno.create({
            RA: ra,
            userId: userId,
            cursoId: course
        }).then(newAluno => {
            console.log('\x1b[32m%s\x1b[0m','ALUNO CRIADO COM SUCESSO!!');
            res.redirect("/admin/aluno");
        }).catch(err => {
            console.error("\x1b[31m",'Erro ao criar Aluno:', err);
        });
    }).catch(err => {
        console.error("\x1b[31m",'Erro ao criar Usuário:', err);
    });
});


module.exports = router;