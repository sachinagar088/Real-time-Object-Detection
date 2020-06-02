const express=require("express");
const Clarifai = require('clarifai');
var ejs = require('ejs');
var app=express();
var request=require('request');
const app1 = //api key
const port = 3000;
let x='';
var fruit=["apple","mango","banana","watermelon","grapes","guava","kiwi","jackfruit","lime","orange","onion"]
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.get("/", (req, res) => {
  res.render("camera.ejs", {
    root: __dirname
  })
});
app.post("/upload", (req, res) => {
  const base64String=req.body.txt;
  app1.models.predict("//model secret key", base64String).then(
   response => {
      x=response.outputs[0].data.concepts[0].name;
      console.log(x);
      res.render("result.ejs",{data:x});
},
 err => {
      console.log(err)	
    }
  )
});
app.get("/view",(req,res)=>{
     res.render("result.ejs",{data:x});
});
app.listen(port, () => console.log(`Running on http://localhost:${port}/`))