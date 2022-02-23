const mongoose  = require("mongoose")

const userSchema=mongoose.Schema({
    userName:String,
    password:String,
})

const userModel=mongoose.model("user",userSchema,"user")
module.exports=userModel
