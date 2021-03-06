const express = require("express");
const app = express();
const mongoose =require("mongoose")
const hbs =require("express-handlebars")
const path = require("path")
const bodyParser =require("body-parser")
const port = 8080;
const connect = require("./db/con");
const records = require("./model/records");
const bcrypt = require("bcryptjs")
//middleware
app.engine(".hbs", hbs({defaultLayout:"main",extname:".hbs"}))
app.set("view engine",".hbs")
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//connect database
connect();
//router

app.get("/",(req,res)=>{
    res.render("index",{title:"Home"});
})
app.post("/form",async(req,res)=>{
    const data = new records({
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        password:req.body.password
    });
    await data.save();
    res.render("login");

})
app.get("/login",(req,res)=>{
    res.status(201).render("login")
})
app.post("/login",async(req,res)=>{
 try{const email=req.body.email;
    const password = req.body.password;
    const match = await records.findOne({email:email});
    const isMatch = await bcrypt.compare(password,match.password)
       if(isMatch){
        res.render("dashboard",{fname:match.fname,lname:match.lname})
         }
        else{
            res.send("LOGIN DETAIL WRONG")
        }
}catch(err){
    res.send("data could'nt found")
}
})
//server listen

app.listen(port,()=>{
    console.log(`server start at ${port}`)
})
