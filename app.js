//jshint esversion: 6
require('dotenv').config();
const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https=require("https");
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

  app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
  });

  app.post("/", function(req, res){
    const Email=req.body.email;
    const Password=req.body.password;
    const ConfirmPassword=req.body.confirmpassword;
    const Country=req.body.country;
    const States=req.body.states;

const data={
  members: [
    {
      email_address:Email,
      status: "subscribed",
      merge_fields:{
          STATES:States,
          COUNTRY:Country
      }
    }
  ]
};

const jsonData=JSON.stringify(data);
const url=process.env.URL;
const auth_key=process.env.AUTH_KEY;
const options={
  method:"POST",
  auth:auth_key
}
const request=https.request(url, options, function(response){

  if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
  }else{
    res.sendFile(__dirname + "/failure.html");
  }
response.on("data", function(data){
})
})

request.write(jsonData);
request.end();
  });

  app.post("/failure", function(req, res){
    res.redirect("/");
  });

  app.post("/success", function(req, res){
    res.redirect("/");
  });

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});
