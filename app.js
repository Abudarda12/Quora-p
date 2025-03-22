const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
//const { title } = require('process');
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
//app.set(express.static(path.join(__dirname,"public")));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

let posts = [
    {
        id:uuidv4(),
        title:"Post 1",
        content:"This is the first post" , 
        Image:"https://media.istockphoto.com/id/121199853/photo/closeup-of-guy-working-on-a-laptop-indoor.webp?a=1&b=1&s=612x612&w=0&k=20&c=1cFqSPIjH981E69lJFNrRiqUDDsOqHfRdpW2CKu9sSc="
    },
    {
        id:uuidv4(),
        title:"Post 2",
        content:"This is the second post",
        Image:"https://media.istockphoto.com/id/1265024528/photo/no-better-adventure-buddy.webp?a=1&b=1&s=612x612&w=0&k=20&c=tStWgNSFBAGPyu4gfJfDEjqMPDnvgqWUkIPyZYGS090="
    },
    {
        id:uuidv4(),
        title:"Post 3",
        content:"This is the third post",
        Image:"https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"  
    } 

];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts:posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
});

app.post("/posts",(req,res)=>{
    let {title,content,Image}= req.body;
    posts.push({title,content,id:uuidv4(),Image});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>p.id == id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;

    let post = posts.find((p)=> p.id == id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts")
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.filter((p)=> p.id !== id);
    posts = post;
    res.redirect("/posts")

})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> p.id == id);
    res.render("edit.ejs",{post});
});

app.listen(port,()=>{
    console.log(`app is listening at port ${port}`);
});
