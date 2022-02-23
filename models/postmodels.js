const  mongoose  = require("mongoose")

const  postSchema= mongoose.Schema({
    pname:String,
    caption:String,
    pimage:String
})

const postModel= mongoose.model("post",postSchema,"post");
module.exports=postModel;
