var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var floodSchema = new Schema({
  date : String,
  geologistEmail: String,
  polygon : [{
    lat: Number,
    lng: Number
  }]
},{ collection : 'FloodData'});

var coverageSchema = new Schema({
  name : String,
  polygon : [{
    lat: Number,
    lng: Number
  }]
},{ collection : 'coveragePolygons'});

module.exports = mongoose.model('FloodData', floodSchema);
module.exports = mongoose.model('coveragePolygons', coverageSchema);

