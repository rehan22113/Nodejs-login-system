const mongoose=require("mongoose");

const connect=()=>{
    mongoose
    .connect("mongodb://localhost:27017/hashing",{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true })
    .then(()=>{
    console.log("database established")})
    .catch((err)=>{
        console.log(err)
    })
}


module.exports = connect;
