let busboy = require('connect-busboy')

var fs = require('fs');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

router.post('/uploadFile', (req, res) => {
  req.busboy.on('file', function (fieldname, file, filename) {
    console.log("received file");
  

    var fstream = fs.createWriteStream('./uploads/' + filename.filename);
    console.log(req.busboy);
    console.log(filename);
    file.pipe(fstream);
    fstream.on('close', function () {
      res.send('ok'); //response to client 
    });
  });
  req.pipe(req.busboy);
 })


module.exports = router;
