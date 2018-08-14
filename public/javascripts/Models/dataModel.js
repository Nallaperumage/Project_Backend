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

// var testSchema = new Schema({
//     _id : String,
//     // investigation_id : [investigationSchema],
//     name : String,
//     readings : String,
//     charts : String,
//     description : String
  
// },{ collection : 'test'});

var investigationSchema = new Schema({
    _id : String,
    name : String,
    classification_id : String,
    // test_id : [testSchema],
    mapping_id : String,
    description : String
  
  },{collection:'Investigations'});

var locationSchema = new Schema({
    _id : String,
    latitudes : String,
    longitudes : String,
    investigation_id : String,
    test_id : String,
    timestamp : String,
    location_id : String,
    location : String

},{collection : 'Location'})


module.exports = mongoose.model('NewData', locationSchema);
module.exports = mongoose.model('InvestigationData', investigationSchema);
  
  
