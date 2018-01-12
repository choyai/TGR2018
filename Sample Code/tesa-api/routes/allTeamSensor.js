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

// GET alert
// rou

// POST timestamp at which to redirect to
// POST alert
// team id : int
// description : string

// router.post('/alert', function(req, res){
//   var teamID = req.body.teamID;
//   var description = req.body.description;
//   res.redirect(/:teamID/:);
// });

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

router.get('/:starttime/:endtime', function(req, res) {
  Promise.all([
    querySensor(req, res, 'accelerometer'),
    querySensor(req, res, 'temperature'),
    querySensor(req, res, 'din1')
  ]).then((results) => {
    res.json({
      statusCode: status["00"].code,
      statusDesc: status["00"].desc,
      data: results
    });
  });
  // requestSensors(req, res, sensors, function(result) {
  // });
});


function querySensor(req, res, sensor) {
  var sensors = ['accelerometer', 'temperature', 'din1'];
  var starttime = req.params.starttime;
  var endtime = req.params.endtime;

  var starthour = parseInt(starttime.slice(0, 2));
  console.log(starthour);
  var endhour = parseInt(endtime.slice(0, 2));
  var startmin = parseInt(starttime.slice(2, 4));
  var endmin = parseInt(endtime.slice(2, 4));

  var timemax = new Date(Date.now());
  var timemin = new Date(Date.now());
  timemax.setHours(endhour);
  console.log(timemax);

  timemax.setMinutes(endmin);
  // timemin.setDate(11);
  timemin.setHours(starthour);
  timemin.setMinutes(startmin);
  console.log(timemin);
  return new Promise((resolve, reject) => {


    var query = db.model(sensor).find({
      date: {
        '$lt': timemax
      }
    }).find({
      date: {
        '$gte': timemin
      }
    }).sort({
      date: 'ascending'
    });

    var result = [];
    query.exec(function(err, data) {
      if (err) {
        console.log(err);
        reject(new Error(err));
      } else if (data.length == 0) {
        console.log('no data');
      } else {
        for (var i = 0; i < data.length; i++) {
          data[i].sensor = sensor;
          // console.log(sensor);
          // console.log(data[i]);
        }
        result.push(data);
        // console.log(data);
        // console.log(result);
      }
      resolve(result);
    });
  });
}

// res.render(table, {
//   data: data
// });

// function get_query_all()

module.exports = router;