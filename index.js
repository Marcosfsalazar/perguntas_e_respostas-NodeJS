const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database')
const Question = require("./database/Question")
const Answer = require("./database/Answer");
const { render } = require("ejs");

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

//gamb
const ACTIVE = 'active';
const INACTIVE = '';

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
            questions,
            activeAsk: INACTIVE,
            activeHome: ACTIVE
        })
    });
})

app.get("/ask",(req,res)=>{
    res.render('ask',{
        activeAsk: ACTIVE,
        activeHome: INACTIVE
    });
})

app.post("/saveform",(req,res)=>{
    let title = req.body.title; //recebendo o post com bodyparser
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
            Answer.findAll({
                where: {questionId:question.id},
                order: [['id','DESC']]
            }).then(answers => {
                res.render("question",{
                    question,
                    answers,
                    activeAsk: INACTIVE,
                    activeHome: ACTIVE
                })
            })

        }else{
            res.redirect("/")
        }
    })
})

app.post("/answer",(req,res)=>{
    let content = req.body.content;
    let question = req.body.question;
    
    Answer.create({
        content: content,
        questionId: question
    }).then(()=>{
        res.redirect("/question/"+question);
    })
})

app.listen(port,()=>{
    console.log("working")
})