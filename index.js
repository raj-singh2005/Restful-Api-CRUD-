const express = require("express");
const path = require("path");
const app = express();
const { v4: uuidv4 } = require('uuid');
const methodOveride = require("method-override");
app.set("view engine","ejs");
app.set("views" , path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOveride('_method'));
const port = 8080 ;


let posts = [
    {
       id :uuidv4() ,
        username:"Raj_singh",
        content : "Just wrapped up a challenging but rewarding project implementing a new responsive design framework. Seeing how seamlessly the website adapts across devices is always satisfying! What's your favorite part of the responsive design process?  "
    } ,
    {
       id :uuidv4() , 
        username:"Adam.io",
        content : "Leveling up my JavaScript skills this week by diving deeper into asynchronous programming with Async/Await. It's amazing how much cleaner and more readable the code becomes. What are your go-to resources for mastering async JS?  "
    } ,
    {
        id :uuidv4() ,
        username:"Eve.dev",
        content : "Thinking about the importance of website accessibility (WCAG guidelines) in every project. It's not just a nice-to-have; it's crucial for inclusivity and reaching a wider audience. What are some simple accessibility checks you incorporate into your workflow? "
    } ,
    {
        id :uuidv4() ,
        username:"Bob.net",
        content : "The debate continues: which frontend framework reigns supreme for your current project? React, Angular, or Vue.js? Each has its strengths. Share your experiences and what factors influence your decision!"
    } ,
    {
        
        id :uuidv4() ,
        username:"Donald.io",
        content: "Quick tip for fellow web developers: consistently optimizing your website's performance (image compression, code minification, etc.) can significantly improve user experience and SEO. What's one performance optimization technique you swear by?"
    }
];
app.get("/posts", (req,res) =>{
    res.render("index.ejs" , {posts});
});

app.get("/posts/new",(req,res)=>{
   res.render("new.ejs")
});

app.post("/posts", (req,res)=>{
   let {username,content} = req.body;
   let id = uuidv4() ;
   posts.push({ id,username,content});
   res.redirect("/posts");
});
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params ;
    let post = posts.find((p)=> id === p.id);
    let newcontent = req.body.content ;
    post.content=newcontent;
    res.redirect("/posts");
})
app.get("/posts/:id" ,(req,res)=>{
  let {id} = req.params ;
  let post = posts.find((p)=> id === p.id);
  console.log(post);
  res.render("show.ejs",{post});
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params ;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{id,post});

});
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params ;
     posts = posts.filter((p)=> id !== p.id);
     res.redirect("/posts");
});

app.listen(port ,() => {
    console.log(" listening on port : 8080");
});
