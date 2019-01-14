var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var db = mongoose.connect('mongodb://localhost:27017/test', function(err, response){  
  if(err){
     console.log( err); 
  }  
  else{
    console.log('Connected to ' + db, ' + ', response);
  }  
});

var Schema = mongoose.Schema;

var userSchema = new Schema({
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
  stripeCustomerId: String,
  discount : Number,
  resetPasswordToken: String,
  resetTokenValidity: Boolean,
  hash: String,
  salt: String

},{ collection : 'newUsers'});

var availabilitySchema = new Schema({
  geologistEmail : String,
  availability : String
},{ collection : 'AvailableGeologists'});

var assignmentsSchema = new Schema({
  customerEmail : String,
  geologistEmail : String,
  investigationName : String,
  dueDate : String,
  startDate : String,
  fullCharge : Number,
  downPayment : Number,
  clearance : Number,
  fine : Number,
  completion : String
},{ collection : 'Assignments'});

// var loggedRouteSchema = new Schema({
//   userName : {
//     type : String,
//     unique: true,
//     required: true
//   },
//   email : {
//     type : String,
//     unique: true,
//     required: true
//   },
//   role: {
//     type : String,
//     required: true
//   }

// },{ collection : 'newUsers'});

// var loginCookieSchema = new Schema({
//   userName : {
//     type : String,
//     unique: true,
//     required: true
//   },
//   email : {
//     type : String,
//     unique: true,
//     required: true
//   }

// },{ collection : 'newUsers'});



userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};


userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);

  return jwt.sign({
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    userName: this.userName,
    email: this.email,
    role: this.role,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

// loggedRouteSchema.methods.generateJwt = function() {
//   var expiry = new Date();
//   expiry.setDate(expiry.getDate() + 1);

//   return jwt.sign({
//     userName: this.userName,
//     email: this.email,
//     role: this.role,
//     exp: parseInt(expiry.getTime() / 1000),
//   }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
// };

// loginCookieSchema.methods.generateJwt = function() {
//   var expiry = new Date();
//   expiry.setDate(expiry.getDate() + 30);

//   return jwt.sign({
//     userName: this.userName,
//     email: this.email,
//     exp: parseInt(expiry.getTime() / 1000),
//   }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
// };

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('AvailableGeologists', availabilitySchema);
module.exports = mongoose.model('Assignments', assignmentsSchema);


