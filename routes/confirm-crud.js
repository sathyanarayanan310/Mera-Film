var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');

var confirmSchema = mongoose.Schema({
  conbookingid:String,
  conUser:String,
  conMail:String,
  conCityName:String,
  conFilmName:String,
  conHallName:String,
  conDay:String,
  conShowTime:String,
  conAmount:String,
  connofseats:String,
  conseatNo:String

 });

var Confirm = mongoose.model('Confirm',confirmSchema,'confirmTable');


router.get('/con', function (req, res) {
    console.log("REACHED GET FUNCTION ON confirmation SERVER");
    Confirm.find({}, function (err, docs) {
         res.json(docs);

    });
});

router.get('/con/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON confirmation SERVER");
     Confirm.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/con', function(req, res){
  console.log(req.body);
  var cId = req.body.conbookingid;
  var cuser = req.body.conUser;
  var cmail = req.body.conMail;
  var cMovie = req.body.conFilmName;
  var cCity= req.body.conCityName;
  var ctheater = req.body.conHallName;
  var cDate= req.body.conDay;
  var cShow = req.body.conShowTime;
  var cAmnt = req.body.conAmount;
  var cNumbers = req.body.connofseats;
  var cSeat = req.body.conseatNo;

  var confirm1 = new Confirm({
    conbookingid:cId,
    conUser:cuser,
    conMail:cmail,
    conFilmName:cMovie,
    conCityName:cCity,
    conHallName:ctheater,
    conDay:cDate,
    conShowTime:cShow,
    conAmount:cAmnt,
    connofseats:cNumbers,
    conseatNo:cSeat
});

  confirm1.save(function(err, docs){
    if ( err ) throw err;
    console.log("confirmation Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/con/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Confirm.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/con/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
  Confirm.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
