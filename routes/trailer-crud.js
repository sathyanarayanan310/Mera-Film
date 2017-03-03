
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');
//var dbHost = 'mongodb://localhost:27017/test';
//mongoose.connect(dbHost);


var trailerSchema = mongoose.Schema({
	trailerID:String,
  trailerName: String,
    duration:String,
    desc:String
 });

 //$scope.selected = $scope.options[0];
var Trailer = mongoose.model('Trailer', trailerSchema, 'trailer');



//Master
  router.get('/trailerserver', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Trailer.find({}, function (err, docs) {
         res.json(docs);
    });
});


router.get('/trailerserver/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Trailer.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/trailerserver', function(req, res){
  console.log(req.body);
  var id = req.body.trailerID;

  var name = req.body.trailerName;
  var rating= req.body.duration;
  var description=req.body.desc;
  var trailerpost = new Trailer({
    trailerID : id,
   trailerName:name,
   duration:rating,
   desc:description

  });

  trailerpost.save(function(err, docs){
    if ( err ) throw err;
    console.log("Book Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/trailerserver/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Trailer.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/trailerserver/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Trailer.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})


// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
