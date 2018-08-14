var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next) {
  res.sendFile(path.join(__dirname,'./angular/dist'));
  // res.render('index', { title: 'Express' });
});

module.exports = router;