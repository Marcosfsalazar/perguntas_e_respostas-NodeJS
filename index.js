const express = require("express");
const app = express();
const bodyParser = require("body-parser");

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
    res.render("index")
})

app.get("/ask",(req,res)=>{
    res.render('ask');
})

app.post("/saveform",(req,res)=>{
    let title = req.body.title;
    let question = req.body.question;
    res.send("form received!<br> title: " + title +"<br>question: " + question)
})

app.listen(port,()=>{
    console.log("working")
})