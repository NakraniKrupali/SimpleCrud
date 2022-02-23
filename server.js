const express = require('express')
const mongoose= require("mongoose");
const app = express()
const port = 4000
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/FinalCrud").then(console.log("Mongoose connected"))

const userModel=require("./models/usermodel")
const postModel=require("./models/postmodels")

//login
app.post("/user/login",async(req,res)=>{
    const user=await userModel.findOne({userName:req.body.userName,password:req.body.password})
    if(user !== null){
        return res.send({data:"Login Successfully",user:user})
    }
    return res.send({data:"wron credentials....."})

})

//registration
app.post("/user/registration",async(req,res)=>{
    const user=req.body;
    userModel.create(user)
    return res.send({data:"Registration Successfully...."})
})

//addpost
app.post("/post/add",(req,res)=>{
    const post=req.body;
    postModel.create(post)
    return res.send({data:"Add Post  Successfully...."})

})

//deletePost
app.post("/post/delete",async(req,res)=>{
    const pid=req.body.id;
    const post= await postModel.findOneAndDelete({_id:pid})
    if(post != null){
        return res.send({data:"delete Post  Successfully...."})
    }
    return res.send({data:" Post cant delete Successfully...."})

})
//updatePost
app.put("/post/update/:id",async(req,res)=>{
    const id= req.params.id;
    const post= req.body;
    const updatedPost=await  postModel.findByIdAndUpdate(
        {_id:id},
        {pname:post.pname,
            caption:post.caption,
            pimage:post.pimage},
            {new:true})
    if(updatedPost){
        return res.send({data:"Update Successfully", post:updatedPost})
    }
    return res.send({data:"post cant Update "})

})

app.get("/post/get",async(req,res)=>{
    const postList= await postModel.find({})
    if(postList){
        return res.send({data:postList})
    }
})
//onsearch
app.post("/post/search",async(req,res)=>{
    const pname=req.body.pname;
    const postList = await postModel.find({pname:pname})
    if(postList){
        return res.send({data:postList})
    }
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))