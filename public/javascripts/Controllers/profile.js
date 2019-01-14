var mongoose = require('mongoose');
var User = mongoose.model('User');
var Availability = mongoose.model('AvailableGeologists');
var Assignments = mongoose.model('Assignments');

module.exports.profileRead = function(req, res) {

  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    Availability.findOne({
      geologistEmail: req.payload.email
    }).exec(function(err, data) {
      res.status(200).json(data.availability);
      });
  }

};

module.exports.profileSet = function(req, res) {
  Availability.findOne({
    geologistEmail: req.body.email 
    }, function (err, geologist) {
      geologist.availability = req.body.data
      geologist.save(function(err) {
        res.status(200);
        res.json('success');
    });
  })
}

module.exports.activityRead = function(req, res) {
  Assignments.find({
    geologistEmail: req.payload.email
    }).exec().then( function (assignment , err) {
      res.status(200);
      res.json(assignment);
  })
}

