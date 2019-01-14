var mongoose = require('mongoose');
var query = mongoose.Query;
var FloodData = mongoose.model('FloodData');
var coveragePolygon = mongoose.model('coveragePolygons');
var Mailing = require('./sendEmail');

module.exports.floodCheck = function (req, res, next) {
    FloodData.find().exec().then(function(data, err){
        if(err){
          return res.send("No data found"+err);
        }
        return res.status(200).json(data);
    })
}


module.exports.dataCheck = function (req, res, next) {
    coveragePolygon.findOne({
        name: "floodCoverage"
    },function(err, data){
        if(err){
          return res.send("Not found");
        }
        return res.status(200).json(data);
    })
}


module.exports.floodInsert = function (req, res, next) {
    var floodData = new FloodData();
  
    floodData.date = req.body.token.date;
    floodData.geologistEmail = req.body.token.email;
    floodData.polygon = req.body.polygon;

    if(req.body.token.customerEmail != ''){
        var info = Mailing.sendEmailCustomer(req.body.token.customerEmail,req.body.token.email);
    }
  
    floodData.save(function(err) {
        if(err){
           return res.send('notInserted!')
        }
        return res.status(200).json('Inserted');
    });

}