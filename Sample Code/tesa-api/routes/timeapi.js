var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var schema = require('../models/schema');
var db = require('../models/db');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));


// POST timestamp at which to redirect to

router.post('/:table/:teamID', function(req, res) {
  var table = req.params.table;
  // var schema = db.model(table);
  // var data = new schema(req.body);
  // data.save(function(err, result){
  //     if (err) res.send(err);
  //     else res.send('success');
  // });
  var timestamp = req.body.date;
  var table = req.params.table;
  var teamID = req.params.teamID;
  var time = new Date(parseInt(timestamp));
  console.log(time);
  res.redirect('/' + timestamp);
  // if (typeof time === 'Date') {
  //   res.redirect('/time/:table/:teamID/:timestamp');
  // } else {
  //   res.send('error, time is not time');
  // }
});

//GET sensor data for 30 minutes prior to timestamp

router.get('/:table/:teamID/:timestamp', function(req, res) {
  var table = req.params.table;
  var teamID = req.params.teamID;
  var timestamp = new Date(parseInt(req.params.timestamp));
  var unixtime = timestamp.getTime();
  var timemin = new Date(unixtime - 1800000);
  console.log(timemin);
  console.log(unixtime);
  console.log(timestamp);
  var query = db.model(table).find({
    teamID: teamID,
    date: {
      '$lte': timestamp
    },
    date: {
      '$gt': timemin
    }
  });

  query.exec(function(err, data) {
    if (err) {
      res.send(err);
    } else if (data.length == 0) {
      res.json({
        statusCode: status["01"].code,
        statusDesc: status["01"].desc
      });
    } else {
      // res.json({
      //     statusCode: status["00"].code,
      //     statusDesc: status["00"].desc,
      //     data: data
      // });
      // console.log(data);
      res.render(table, {
        data: data
      });
    }
  });
});

module.exports = router;