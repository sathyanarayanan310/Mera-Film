var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');

var mappingSchema = mongoose.Schema({
 Film:String,
 Year:String,
 Poster:String,
 Language:String,
 City:String,
 Hall:String,
 showtime:String,
 Rating:String,
 From:String,
 To:String
});

var Mapping = mongoose.model('Mapping',mappingSchema, 'mappingTable');


router.get('/map', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Mapping.find({}, function (err, docs) {
         res.json(docs);

    });
});

router.get('/map/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Mapping.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/map', function(req, res){
  console.log(req.body);
    var film = req.body.Film;
    var yrs = req.body.Year;
    var image = req.body.Poster;
    var lan = req.body.Language;
    var city = req.body.City;
    var theater = req.body.Hall;
    var show = req.body.showtime;
    var rate = req.body.Rating;
    var frm = req.body.From;
    var to = req.body.To;
    var mapping1 = new Mapping({
      Film:film,
      Year:yrs,
      Poster:image,
      Language:lan,
      City:city,
      Hall:theater,
      Rating:rate,
      showtime:show,
      From:frm,
      To:to
});

  mapping1.save(function(err, docs){
    if ( err ) throw err;
    console.log("map Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/map/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Mapping.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/map/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
  Mapping.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
