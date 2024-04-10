const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const bcrypt = require("bcryptjs");

const alunosController = require("./alunos/AlunosController");
//const professoresController = require("./professores/ProfessoresController");
const adminsController = require("./admins/AdminsController");

const User = require("./users/User");
const Curso = require("./cursos/Curso");
const Materia = require("./materias/Materia");
const Aluno = require("./alunos/Aluno");
const Professor = require("./professores/Professor");
const AlunoMateria = require("./alunos/Aluno_Materia");
//const Professor = require("./professores/Professor");
const Admin = require("./admins/Admin");

//View Engine
app.set('view engine','ejs');

//Arquivos Estáticos
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database
connection
    .authenticate()
    .then(()=>{
        console.log('\x1b[32m%s\x1b[0m',"Conexão feita com sucesso!!");
    }).catch((error)=>{
        console.log(error);
    })

app.get("/", (req,res)=>{
    res.render("forms/curso");
});

//Controller
app.use("/",alunosController);
//app.use("/",professoresController);
app.use("/",adminsController);

app.get("/home", (req,res)=>{
    res.render("index");
});

app.post("/unizon/authentication",(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;

    res.json({email, password});

});


app.listen(8080,()=>{
    console.log("------------------------------------------")
    console.log('\x1b[36m%s\x1b[0m', "O servidor está rodando!!");
});