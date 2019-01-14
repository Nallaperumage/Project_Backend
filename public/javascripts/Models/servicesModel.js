var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceSchema = new Schema({
    name : String,
    dataPrice: Number,
    carryOutPrice: Number,
    duration : String,
    images : String,
    description : String
},{ collection : 'Service'});

module.exports = mongoose.model('Service', serviceSchema);