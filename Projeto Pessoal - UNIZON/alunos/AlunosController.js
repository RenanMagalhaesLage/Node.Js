const express = require("express");
const router = express.Router();

router.get("/aluno", (req,res)=>{
    res.render("aluno/index");
});

router.get("/aluno/perfil", (req,res)=>{
    res.render("aluno/perfil");
});

router.get("/aluno/matricula", (req,res)=>{
    res.render("aluno/matriculaMateria");
});

router.get("/aluno/trancamento", (req,res)=>{
    res.render("aluno/trancamentoMateria");
});


module.exports = router;