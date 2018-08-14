var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/',function(req, res, next) {
//   res.sendFile(path.join(__dirname,'./angular/dist'));
//   // res.render('index', { title: 'Express' });
// });

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('index', { title: 'Express' });
});

module.exports = router;
