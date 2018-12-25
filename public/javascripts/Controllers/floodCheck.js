var mongoose = require('mongoose');
var query = mongoose.Query;
var FloodData = mongoose.model('FloodData');

module.exports.floodCheck = function (req, res, next) {
    FloodData.find().exec().then(function(data, err){
        if(err){
          return res.send("No data found"+err);
        }
        return res.status(200).json(data);
    })
}

module.exports.floodInsert = function (req, res, next) {
    var floodData = new FloodData();
  
    floodData.name = req.body.name.secondCtrl;
    floodData.polygon = req.body.polygon;
  
    floodData.save(function(err) {
        if(err){
           return res.send('Polygon not Inserted!')
        }
        return res.status(200).json('Polygon Inserted');
    });
}