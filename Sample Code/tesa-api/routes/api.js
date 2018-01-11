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

const status = {
  "00": {
    code: "00",
    desc: "Success"
  },
  "01": {
    code: "01",
    desc: "Cannot find the given TeamID"
  },
  "02": {
    code: "02",
    desc: "Cannot find the requested data"
  }
};

//GET sensor data from db with N = number of results

router.get('/:table/:teamID/:N', function(req, res) {
  var table = req.params.table;
  var teamID = req.params.teamID;
  var N = req.params.N;
  var query = db.model(table).find({
    teamID: teamID
  });
  if (N != 'all') {
    query = query.limit(parseInt(N));
  }
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

//GET sensor data for 30 minutes prior to timestamp

router.get('/time/:table/:teamID/:timestamp', function(req, res) {
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
    // date: {
    //   '$gt': timemin
    // }
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

// POST new data to table
router.post('/:table', function(req, res) {
  var table = req.params.table;
  var schema = db.model(table);
  var data = new schema(req.body);
  data.save(function(err, result) {
    if (err) res.send(err);
    else res.send('success');
  });
});

// POST timestamp at which to redirect to

router.post('/:table/:teamID/:N', function(req, res) {
  var table = req.params.table;
  // var schema = db.model(table);
  // var data = new schema(req.body);
  // data.save(function(err, result){
  //     if (err) res.send(err);
  //     else res.send('success');a
  // });
  var timestamp = req.body.timestamp;
  var table = req.params.table;
  var teamID = req.params.teamID;
  if (typeof time === 'Date') {
    res.redirect('/:table/:teamID/:timestamp');
  } else {
    res.send('error, time is not time');
  }
});

module.exports = router;