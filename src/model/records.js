const mongoose=require("mongoose")
const bcrypt = require("bcryptjs");
const struct = new mongoose.Schema({

    fname:{
        type:String,
        required:true,
        unique:true

    },
    lname:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})

struct.pre("save",async function(next){
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password,10)
    console.log(this.password);
}
    next();
})
const model = new mongoose.model("collect",struct);

module.exports = model;