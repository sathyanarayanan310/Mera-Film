var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');

var showSchema = mongoose.Schema({
  showID:String,
  showTime:String
 });
var Show = mongoose.model('Show',showSchema, 'showTable');


router.get('/showt', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Show.find({}, function (err, docs) {
         res.json(docs);

    });
});

router.get('/showt/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Show.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/showt', function(req, res){
  console.log(req.body);
  var id = req.body.showID;
  var time = req.body.showTime;
var show1 = new Show({
    showID:id,
    showTime:time
});

  show1.save(function(err, docs){
    if ( err ) throw err;
    console.log("show Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/showt/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Show.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/showt/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
  Show.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
