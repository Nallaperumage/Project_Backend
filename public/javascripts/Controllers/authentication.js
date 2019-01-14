var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
    var user = new User();
  
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.userName = req.body.userName;
    user.email = req.body.email;
    user.role = req.body.role;
    user.stripeCustomerId = null;
    user.discount = 0;
    user.resetPasswordToken = null;
    user.resetTokenValidity = false;

  
    user.setPassword(req.body.password);
  
    user.save(function(err) {
      var token;
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    });
  };

  

module.exports.login = function(req, res) {

  passport.authenticate('local', function(err, user, info){
    var token;
    
  
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }
  
    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
  
};

module.exports.resetLogin = function(req, res) {

  User.findOne({
    email: req.body.email 
    }, function (err, user) {
  
      if(user.resetTokenValidity==false){
        return 'Your token is only valid for one time';
      }

      user.setPassword(req.body.password);
      user.resetPasswordToken = null;
      user.resetTokenValidity = false;
      user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      });
    }
  )
};



module.exports.logout = function(req, res) {}