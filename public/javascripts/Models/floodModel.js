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

var floodSchema = new Schema({
    name : String,
    polygon : [{
      lat: Number,
      lng: Number
    }]
  
  
  },{ collection : 'FloodData'});

  module.exports = mongoose.model('FloodData', floodSchema);