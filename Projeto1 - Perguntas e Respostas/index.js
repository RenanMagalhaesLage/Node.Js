const express = require("express");
const app = express();
const bodyParser = require("body-parser");  //Biblioteca para pegar dados do form
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//Database
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com sucesso com o banco de dados!");
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

app.set('view engine', 'ejs');              // Dizendo para o Express usar o EJS como View Engine
app.use(express.static('public'));          //Lincando o CSS com o arquivo

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/",(req,res) => {
    //Listando as perguntas
    Pergunta.findAll({raw:true, order:[
        //O primeiro atributo significa por qual parte do banco de dados queremos ordenar, nesse caso é o id
        ['id','DESC'] //Ordenando a ordem das perguntas, DESC --> Decrescente, ASC --> Crescente
    ]}).then(perguntas =>{
        console.log(perguntas);
        res.render("index", {
            perguntas: perguntas
        });
    }) // --> é equivalente ao select all
});

app.get("/perguntar", (req,res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta",(req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    //Salvando os dados no banco de dados
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/"); // redirecionando o usuário após fazer uma pergunta
    }) // --> create é equivalente ao INSERT INTO 
});

app.get("/pergunta/:id",(req,res)=>{
    var id = req.params.id;
    Pergunta.findOne({              //Buscando um dado no banco de dados
        where: {id:id}
    }).then(pergunta => {
        if(pergunta !=undefined){   //pergunta existe?
            Resposta.findAll({
                where:{perguntaId:pergunta.id},
                order: [['id', 'DESC']]
            }).then(respostas =>{
                res.render("pergunta",{
                    pergunta:pergunta,
                    respostas:respostas
                });
            })
        }else{
            res.redirect("/");
        } 
    })      
})

app.post("/responder",(req, res)=>{
    var corpo = req.body.corpo;  // esse .corpo indica a parte do formulário que desejamos, esse nome está no "name" do form
    var perguntaId = req.body.pergunta; 
    Resposta.create({
        corpo:corpo, //corresponde aos campos do database
        perguntaId:perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId); //Redirecionando o usuário para a página da pergunta

    });
})

app.listen(8080,()=>{
    console.log("App rodando");
})