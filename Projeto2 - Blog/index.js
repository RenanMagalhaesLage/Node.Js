const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController"); // Importando rota de outro arquivo
const articlesController = require("./articles/ArticlesController"); // Importando rota de outro arquivo
const usersController = require("./users/UsersController"); // Importando rota de outro arquivo

//Importando meus models
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/User");


//Configurando o EJS
app.set('view engine', 'ejs'); 

//Configurando as sessões
app.use(session({
    secret: "qualquercoisa", //palavra aleatória para segurança da sessões3
    cookie: {
        maxAge: 1200000 //em milisegundos
    }
}));

//Configurando para aceitar arquivos estáticos como CSS
app.use(express.static('public')); 

//Configurando o body Parser
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json());

//Database
connection.authenticate().then(()=>{
    console.log("Conexão feita com sucesso!");
}).catch((error)=>{
    console.log(error);
})

//Usando os controllers
app.use("/",categoriesController);
app.use("/",articlesController);
app.use("/",usersController);

app.get("/session",(req,res)=>{

})


app.get("/", (req,res)=>{
    Article.findAll({
        raw:true, 
        order:[
            ['id','DESC']
        ],
        limit: 4
    }).then(articles =>{
        Category.findAll().then(categories=>{
            res.render("index",{articles:articles, categories:categories});
        });
    });
});

app.get("/:slug",(req,res)=>{
    var slug = req.params.slug;
    Article.findOne({
        where:{
            slug:slug
        }
    }).then(article=>{
        if(article!=undefined){
            Category.findAll().then(categories=>{
                res.render("article",{article:article, categories:categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch(err=>{
        res.redirect("/");
    })
});

app.get("/category/:slug",(req,res)=>{
    var slug = req.params.slug;
    Category.findOne({
        where:{
            slug:slug
        },
        include:[{model:Article}]
    }).then(category=>{
        if(category !=undefined){
            Category.findAll().then(categories=>{
                res.render("index",{articles:category.articles, categories:categories});
            })
        }else{
            res.render("/");
        }
    }).catch(err=>{
        res.render("/");
    })
});

app.listen(8080, ()=>{
    console.log("O servidor está rodando!");
})