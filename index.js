const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database')
const Question = require("./database/Question")

//database

connection
        .authenticate()
        .then(()=>{
            console.log("successful connection!")
        })
        .catch((err)=>{
            console.log("Error:" + err)
        })

//port
const port = 4200

//view engine
app.set('view engine','ejs')
app.use(express.static('public'))

//bodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//routes
app.get("/",(req,res)=>{
    Question.findAll({raw:true,order:[ //raw = dados crus, oder = ordenados pelos parâmetros passados
        ['id','DESC']
    ]}).then((questions)=>{
        res.render("index",{
            questions
        })
    });
})

app.get("/ask",(req,res)=>{
    res.render('ask');
})

app.post("/saveform",(req,res)=>{
    let title = req.body.title;
    let question = req.body.question;
    
    Question.create({
        title: title,
        question: question
    })//insert into
    .then(()=>{
        res.redirect("/")
    })
})

app.get("/question/:id",(req,res)=>{
    let id = req.params.id;
    Question.findOne({
        where:{id: id}
    }).then(question =>{
        if(question != undefined){
            res.render("question")
        }else{
            res.redirect("/")
        }
    })
})

app.listen(port,()=>{
    console.log("working")
})