var mongoose = require('mongoose');
var query = mongoose.Query;
var Tests = mongoose.model('Tests');
// var subData = mongoose.model('InvestigationData');

module.exports.testDataCheck = function (req, res, next) {
  tests.find().ecec().then(
    function(data, err){
      if(err){
        return res.send("Not found");
      }
      return res.status(200).json(data);
  })
}

module.exports.getData = function (req, res, next) {
  // var firstQuery = new query();
  // function searchInvestigations(investigation_id){
  //     firstQuery = Data.find({investigation_id : investigation_id});
  //     return firstQuery;
  // }
  // data = req.body.params
  // return res.status(200).json(req.body.location);

  Tests.findOne({
    test : req.body.test,
    location : req.body.location
  }, function(err, locdata){
    if(err){
      return res.send("Not valid credentials"+err);
    }
    return res.status(200).json(locdata.data);
  })

  var acceptdata = {
    _id: String,
    latitudes: String,
    longitudes: String,
    investigation_id: String,
    test_id: String,
    timestamp: String,
    location_id: String,
    location: String
  }

  // Data.find({}, function (err, data) {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     var responseObject = {
  //       _id: String,
  //       latitudes: String,
  //       longitudes: String,
  //       investigation_id: String,
  //       test_id: String,
  //       timestamp: String,
  //       location_id: String,
  //       location: String
  //     };
  //     JSON.stringify(data);
  //     responseObject = data;
  //     res.send(responseObject);
  //   }
  // });

  // subData.find({},function(err,user){
  //   if(err){
  //     res.send(err);
  //   }
  //   else{
  //     res.send(user);
  //   }
  // })


  // subData.findById(searchInvestigations()).exec(function(err,relate){  
  //     if(err){  
  //       res.send(err);  
  //     }  
  //     else{
  //         var responseObject = relate;
  //         res.send(responseObject);
  //     }  
  // });

};