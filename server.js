var http = require("http")

const express = require("express")
const app = express()

const { connectToDatabase } = require("./model/db");
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


// database side

const database =  require("./model/db")


app.get("/", async function(req, res){
    // res.render("pages/home")


    try {
        const db = await connectToDatabase();
        const collection = db.collection("PaymentCollect");
        const payment = await collection.findOne({});
        // res.json(payment); // Send the fetched data as a response

        console.log(payment)
      } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Internal Server Error");
      }


}) 
http.createServer(function(req, res){

    // res.write("sdfdfdfdf");
    // res.end()
    console.log("server start ...")

})