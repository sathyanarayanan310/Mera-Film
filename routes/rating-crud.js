var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');

var RateSchema = mongoose.Schema({

rating:String,
Title:String,
cnUser:String,
cnMail:String,
moviLanguage:String,
moviYear:String,
Total:String,
comments:String

 });
var Rate = mongoose.model('Rate',RateSchema, 'rateTable');


router.get('/rt', function (req, res) {
    console.log("REACHED GET FUNCTION ON rating SERVER");
    Rate.find({}, function (err, docs) {
         res.json(docs);

    });
});

router.get('/rt/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON rating SERVER");
     Rate.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/rt', function(req, res){
  console.log(req.body);
  var rating1 = req.body.rating;
  // var rating2 = req.body.rateSecond;
  // var rating3 = req.body.rateThird;
  // var rating4 = req.body.rateFourth;
  // var rating5 = req.body.rateFifth;
  var movie = req.body.Title;
  var user = req.body.cnUser;
  var email = req.body.cnMail;
  var lang = req.body.moviLanguage;
  var yrs = req.body.moviYear;
  var words= req.body.comments;
  var totalrating = req.body.Total;



var rate1 = new Rate({
    rating:rating1,
    // rateSecond:rating2,
    // rateThird:rating3,
    // rateFourth:rating4,
    // rateFifth:rating5,
    Title:movie,
    cnUser:user,
    cnMail:email,
    moviLanguage:lang,
    moviYear:yrs,
    comments:words,
    Total:totalrating,

});

  rate1.save(function(err, docs){
    if ( err ) throw err;
    console.log("rating Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/rt/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Rate.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/rt/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
  Rate.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
