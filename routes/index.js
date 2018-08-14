var express = require('express');
var path = require('path');
var router = express.Router();
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost:27017/test', function(err, response){  
  if(err){
     console.log( err); 
  }  
  else{
    console.log('Connected to ' + db, ' + ', response);
  }  
});

var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  name : String,
  email : String,
  password: String
},{ collection : 'users'});

var userData = mongoose.model('userData', userDataSchema);

/* GET home page. */
router.get('/',function(req, res, next) {
  res.sendFile(path.join(__dirname,'./angular/dist'));
  // res.render('index', { title: 'Express' });
});

router.get('/login/User',function(req, res, next){
    userData.find()
    .then(function (doc){
      var responseObject = doc;
      res.send(responseObject);
    });
});

 router.get("/login",function(req,res, next){  
  userData.find({},function(err,data){  
              if(err){  
                  res.send(err);  
              }  
              else{  
                var responseObject = data;              
                  res.send(responseObject);  
                  }  
          });  
  });


router.post('/login',function(req, res, next){
  // var user = {
  //     name : req.body.name,
  //     email : req.body.email,
  //     password : req.body.password
  // }

  var entry = new userData(req.body);

  if(req.body.mode =="Save")  
  {  
    
    entry.save(function(err,data){  
      if(err){  
        res.send(err);                
      }  
      else{        
        res.redirect('/');  
      }  
    });
  }  
  
});

router.post('/update',function(req, res, next){
    var id = req.body.id;

    userData.findById('id',function(err,doc){
        if(err){
            console.log('No Entry Found!!');
        }
        doc.name = req.body.name;
        doc.email = req.body.email;
        doc.password = req.body.password;
        doc.save();
    })
    res.redirect('/');
});


router.post('/delete',function(req, res, next){
    var id = req.body.id;

    userData.findByIdAndRemove(id).exec();

    res.redirect('/');
});






module.exports = router;
