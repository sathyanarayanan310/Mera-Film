var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
  bookingid:String,
  FilmName:String,
  CityName:String,
  HallName:String,
  Day:String,
  ShowTime:Array,
  Amount:String,
  totalAmount:Number,
  nofseats:String,
  seatNo:Array

 });
var Book = mongoose.model('Book',bookSchema, 'bookTable');


router.get('/book', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Book.find({}, function (err, docs) {
         res.json(docs);

    });
});

router.get('/book/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Book.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/book', function(req, res){
  console.log(req.body);
  var id=req.body.bookingid;
  var filmname = req.body.FilmName;
  var cityname= req.body.CityName;
  var theatername = req.body.HallName;
  var day= req.body.Day;
  var show = req.body.ShowTime;
  var money = req.body.Amount;
  var tamount = req.body.totalAmount;
  var nseats = req.body.nofseats;
  var seat = req.body.seatNo;

var book1 = new Book({
  bookingid:id,
    FilmName:filmname,
    CityName:cityname,
    HallName:theatername,
    Day:day,
    ShowTime:show,
    Amount:money,
    totalAmount:tamount,
    nofseats:nseats,
    seatNo:seat,
});

  book1.save(function(err, docs){
    if ( err ) throw err;
    console.log("booking Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/book/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Book.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/book/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
  Book.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
