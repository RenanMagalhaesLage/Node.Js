const express = require("express"); //Importando o Express
const app = express();              // Iniciando o Express

// CRIANDO ROTAS
app.get("/",function(req,res){          // req = requisição, res = resposta 
    res.send("<h1>Bem Vindo!</h1>");    // Sempre devolver uma resposta para o usuário!!
});

app.get("/users/:nome", function(req, res){                         //Criando uma rota com parâmetros OBRIGATÓRIOS
    // req => dados enviado pelo usuário
    // res => resposta que vai ser enviada para o usuário
    var nome = req.params.nome;                                     //Pegando o parametro nome
    res.send("<h1>Olá " + nome + ", seja bem vindo! </h1>");
});

app.get("/blog/:artigo?", function(req,res){                        //Ao usarmos ? estmoas criando uma rota com parâmetros NÃO obrigatórios
    //Checando se existe o parâmetro
    var artigo = req.params.artigo;
    if(artigo){
        res.send("O artigo é: " + artigo );
    }else{
        res.send("Bem vindo ao Blog");
    }
});

app.get("/canal/youtube",function(req,res){
    var canal = req.query["canal"];
    //Verificando se o usuário passou um valor ao querry --> /youtube?canal=nomeCanal
    if(canal){
        res.send(canal);
    }else{
        res.send("Nenhum canal fornecido");
    }
});



app.listen(4000, function(erro){    // 4000 é a porta que desejamos usar para abrir o servidor
    if(erro){
        console.log("Ocorreu um ERRO!");
    }else{
        console.log("Servidor iniciado com sucesso!!")
    }
})