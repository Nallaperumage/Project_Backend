var express = require('express');
var path = require('path');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});


router.get('/',function(req, res, next) {
  res.sendFile(path.join(__dirname,'./angular/dist'));
  // res.render('index', { title: 'Express' });
});


var ctrlProfile = require('../public/javascripts/Controllers/profile');
var authentication = require('../public/javascripts/Controllers/authentication');
var getData = require('../public/javascripts/Controllers/getData');
var Payment = require('../public/javascripts/Controllers/Payment');
var Mailing = require('../public/javascripts/Controllers/sendEmail');
var floods = require('../public/javascripts/Controllers/floodCheck');


router.get('/user/personal-data', auth, ctrlProfile.profileRead);
router.get('/user/activity', auth, ctrlProfile.activityRead);
router.post('/user/personal-data', ctrlProfile.profileSet);
router.post('/user/chart-editor', getData.getData);
router.post('/login', authentication.login);
router.post('/signUp', authentication.register);
router.post('/user/credit-cards', Payment.payment);
router.post('/login/forgot-password', Mailing.sendEmail);
router.post('/login/:token', authentication.resetLogin);
router.post('/user/map-editor', floods.floodInsert);
router.get('/user/map-editor/getCheck', floods.floodCheck);
router.get('/service/floodCheck', floods.floodCheck);
router.post('/service/payment', Payment.payment);
router.get('/service/dataCheck', floods.dataCheck);


// router.get('/login',function(req, res, next){
//     userData.find()
//     .then(function (doc){
//       var responseObject = doc;
//       res.send(responseObject);
//     });
// });

// router.get("/dataPage",function(req,res, next){  
//   Data.find({},function(err,data){  
//     if(err){  
//       res.send(err);  
//     }  
//     else{  
//       var responseObject = data;              
//       res.send(responseObject);  
//     }  
//   });  
// });


// router.post('/signUp',function(req, res, next){
//   // var user = {
//   //     name : req.body.name,
//   //     email : req.body.email,
//   //     password : req.body.password
//   // }

//   var entry = new userData(req.body);

//   if(req.body.mode =="Save")  
//   {  

    
    

//     entry.save(function(err,data){  
//       if(err){  
//         res.send(err);                
//       }
//       else if(data) {}

//     });

//   } 
//   res.redirect('/');
// });

// router.post('/update',function(req, res, next){
//     var id = req.body.id;

//     userData.findById('id',function(err,doc){
//         if(err){
//             console.log('No Entry Found!!');
//         }
//         doc.name = req.body.name;
//         doc.email = req.body.email;
//         doc.password = req.body.password;
//         doc.save();
//     })
//     res.redirect('/');
// });


router.post('/delete',function(req, res, next){
    var id = req.body.id;

    userData.findByIdAndRemove(id).exec();

    res.redirect('/');
});






module.exports = router;
