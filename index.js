const mongoose = require('mongoose',{ useUnifiedTopology :true });
const express = require("express");
const bodyparser = require("body-parser");
const multer=require("multer");
const upload = require("express-fileupload");
const md5 = require("md5");
const index = express();
// requiring modules
index.set('view engine','ejs');
index.use(bodyparser.urlencoded({ extended: true}));
 index.use(upload());
index.use(express.static("public"));
index.use(express.static("uploads"));

//using espress to start the app


mongoose.connect("mongodb://localhost:27017/studentsDB",{ useNewUrlParser: true ,useUnifiedTopology:true });
//database connected
var adminstration={
    name:"Eitex",
    password:md5("123456")
}
//authentication password
 



const pcsSchema={

    profilep:String,
    name:String,
    id:String,
    date:String,
    pcname:String,
    pcid:String,
    department:String
};
const Pc= mongoose.model("Pc",pcsSchema);

//data structure schema



index.get("/" ,function(req, res){
    res.render("home.ejs");
});
//answering request from home route
index.post("/" ,function(req,res){
    const userId=req.body.search;
  
  


  Pc.findOne({id: userId},function(err,foundpc){
    if(err){
        console.log(err);
    }else{
        if(foundpc)
      {res.render("find",{
        profile:foundpc.profilep,
          
          name: foundpc.name,
          studentid: foundpc.id,
          registeringdate: foundpc.date,
          pctype: foundpc.pcname,
          serial: foundpc.pcid,
          department: foundpc.department
    
    });}  else{
        res.render("failed");
    }
        

    }
});

});

//getting informations from register page

index.get("/authentication" ,function(req, res){
    res.render("authentication.ejs");
});

index.get("/search" ,function(req, res){
    res.render("search.ejs");
});


index.post("/authentication" ,function(req, res){
    var userrname=req.body.username;
    var vertification=md5(req.body.password);
    if(adminstration.name===userrname && adminstration.password===vertification){
        res.render("register");
    }else{
        res.render("err");
    }
});
//authenticating the user
index.get("/contact" ,function(req, res){
    res.render("contact.ejs");
});

index.post("/register",function(req,res){
    
  if(req.files){
    console.log(req.files);  
    var file = req.files.file;
    var filename = file.name;
    console.log(filename);
    file.mv('./uploads/'+filename);
    //getting the image file
}
    
     const profilePic=filename;
    
   // capturing the name of the image and using it

   
    
const studentName=req.body.name;
const studentId=req.body.id;
const studentregisteringdate=req.body.date;
console.log(studentregisteringdate);

const pcName=req.body.pcname;
const pcId=req.body.pcid;
const studentDepartment=req.body.department+' '+req.body.department2;


const pc= new Pc({

   profilep:profilePic,
    name:studentName,
    id:studentId,
    date:studentregisteringdate,
    
    pcname:pcName,
    pcid:pcId,
    department:studentDepartment

}); 
pc.save();
res.render("reg.ejs");

//registering new pc-owner
});


Pc.find(function(err,pcs){
    if(err){
        console.log(err);
    }else{
        console.log(pcs);
    }
});

const lostSchema={

    pclp:String,
    namel:String,
    studentidl:String,
    pcidl:String,
    datel:String,
    departmentl:String,
    pcnamel:String,
    status:String
    
    };
const Lost= mongoose.model("Lost",lostSchema);


index.get("/lost", function(req,res){
    res.render("lost.ejs");
});
//answering request from lost route
index.post("/lost" ,function(req, res){



    if(req.files){
        console.log(req.files);  
        var file = req.files.file;
        var filename = file.name;
        console.log(filename);
        file.mv('./uploads/'+filename);
        //getting the image file
    }
        
         const pclPic=filename;
         console.log(pclPic);
        
       // capturing the name of the image and using it
    
       
    const studentname=req.body.namel;
    const studentid=req.body.studentidl;
   console.log(studentid);
    const studentlostpcdate=req.body.datel;
  //  console.log(studentregisteringdate);
    
    const pcname=req.body.pcnamel;
    const pcid=req.body.pcidl;
    const studentdepartment=req.body.departmentl+' '+req.body.department2l;
    
    const stat="missing";
    //const nameLost=req.body.namel;
    //const pcidLost=req.body.seriall;
    //const pclostpic=req.body.

const lost=new Lost({
    pclp:pclPic,
    namel:studentname,
    studentidl:studentid,
    pcidl:pcid,
    datel:studentlostpcdate,
    departmentl:studentdepartment,
    pcnamel:pcname,
    status:stat
    
    

    });
    const username=req.body.namel;
    const serial=req.body.pcidl;
    




Lost.findOne({pcidl:serial},function(err,foundlost){
       if(err){
           console.log(err);
       }else{
           if(foundlost){
               res.render("already");
           }else{
               lost.save();
                res.render("reported.ejs");
            }
        }   

       
    });



    


});
    
//saving the user's laptop to lost pcs
index.get("/lostpcs" ,function(req, res){
    Lost.find({},function(err,lostpcs){
      console.log(lostpcs);
        
            res.render("losts",{
                newLostpc:lostpcs
            });
        
                });
            
           
        
    });
    

        
    




index.post("/status" ,function(req, res){
        const v=req.body.option;
        const id=req.body.sid;
        console.log(v);

        Lost.updateOne({studentidl:id},{status:v},function(err){
             if(err){
                 res.render("takerep.ejs");
                console.log(err);
             }else{
                 res.render("status")
                 console.log("sucessfully updated");
              }
                });
             
         

});


index.listen(4000, function(){
    console.log("server started on port 4000");
});
