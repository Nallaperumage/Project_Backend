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

var userDataSchema = new Schema({
  firstName: {
    type : String,
    required: true
  },
  lastName: {
    type : String,
    required: true
  },
  userName : {
    type : String,
    unique: true,
    required: true
  },
  email : {
    type : String,
    unique: true,
    required: true
  },
  role: {
    type : String,
    required: true
  },
  hash: String,
  salt: String

},{ collection : 'users'});




module.exports = userCollection;