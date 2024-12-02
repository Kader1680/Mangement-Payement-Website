var http = require("http")

const express = require("express")
const app = express()

// app.get('/login', (req, res)=>{
//     res.send("hellow from the login page")
// })

let path = require('path');

// app.set('view engine', path.join(__dirname, "..", "views"))
app.set('view engine', 'ejs')

// use res.render to load up an ejs view file

app.get("/login", function(req, res){
    res.render("pages/login")
}).listen(3000)


app.get("/register", function(req, res){
    res.render("pages/register")
}) 


app.get("/", function(req, res){
    res.render("pages/home")
}) 
http.createServer(function(req, res){

    // res.write("sdfdfdfdf");
    // res.end()
    console.log("server start ...")

})