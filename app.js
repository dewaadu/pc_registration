const mongoose = require('mongoose',{ useUnifiedTopology :true });
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({ extended: true}));
app.use(express.static("public")); 
mongoose.connect("mongodb://localhost:27017/studentsDB",{ useNewUrlParser: true });

const studentSchema = new mongoose.Schema({

name: String,
department: String,
id: String,
pctype: String

});

const Student = mongoose.model("Student" ,studentSchema);
 const student = new Student({

    name:"dawit",
    department:"3rd ted",
    id:"BDU 0904002 ur",
    pctype:"toshiba" 
    
 });
 Student.insertOne(student ,function(err){
     if(err){
         console.log(err);
     }else{
         console.log("sucess");
     }
 });

 