var https = require('https');
var request = require('request');
var mongoose = require('mongoose');

var schema = require('../models/schema');
var db = require('../models/db');

function insert_to_db(table, row) {
  var schema = db.model(table);
  var data = new schema(row);
  data.save(function(err, result) {
    if (err) throw (err);
  });
}

function get_data(teamID) {
  // var agent = new https.Agent({
  //     host: 'loraiot.cattelecom.com',
  //     port: '443',
  //     path: '/',
  //     rejectUnauthorized: false
  // });
  console.log('adding data from team ' + teamID);

  var options = ({
    method: 'GET',
    // agent: agent,
    header: {
      'Content-Type': 'aaplication/json'
    }
  });

  //options.url = 'https://loraiot.cattelecom.com/api/pressure/'+teamID+'/1'
  options.url = 'http://10.0.0.10/api/pressure/' + teamID + '/1'
  request(options, function(err, res, body) {
    if (err) throw err;
    var data = JSON.parse(body).data;
    if (data != undefined) {
      data[data.length - 1].teamID = teamID;
      insert_to_db('pressure', data[data.length - 1]);
      //console.log(data);
    }
  });

  options.url = 'http://10.0.0.10/api/temperature/' + teamID + '/1'
  request(options, function(err, res, body) {
    if (err) throw err;
    var data = JSON.parse(body).data;
    if (data != undefined) {
      data[data.length - 1].teamID = teamID;;
      insert_to_db('temperature', data[data.length - 1]);
      //console.log(data);
    }
  });

  options.url = 'http://10.0.0.10/api/humidity/' + teamID + '/1'
  request(options, function(err, res, body) {
    if (err) throw err;
    var data = JSON.parse(body).data;
    if (data != undefined) {
      data[data.length - 1].teamID = teamID;;
      insert_to_db('humidity', data[data.length - 1]);
      //console.log(data);
    }
  });

  options.url = 'http://10.0.0.10/api/gyroscope/' + teamID + '/1'
  request(options, function(err, res, body) {
    if (err) throw err;
    var data = JSON.parse(body).data;
    if (data != undefined) {
      data[data.length - 1].teamID = teamID;;
      insert_to_db('gyroscope', data[data.length - 1]);
      //console.log(data);
    }
  });

  options.url = 'http://10.0.0.10/api/accelerometer/' + teamID + '/1'
  request(options, function(err, res, body) {
    if (err) throw err;
    var data = JSON.parse(body).data;
    if (data != undefined) {
      data[data.length - 1].teamID = teamID;;
      insert_to_db('accelerometer', data[data.length - 1]);
      //console.log(data);
    }
  });

  options.url = 'http://10.0.0.10/api/magnetometer/' + teamID + '/1'
  request(options, function(err, res, body) {
    if (err) throw err;
    var data = JSON.parse(body).data;
    if (data != undefined) {
      data[data.length - 1].teamID = teamID;;
      insert_to_db('magnetometer', data[data.length - 1]);
      //console.log(data);
    }
  });

  options.url = 'http://10.0.0.10/api/leds/' + teamID + '/1'
  request(options, function(err, res, body) {
    if (err) throw err;
    var data = JSON.parse(body).data;
    if (data != undefined) {
      data[data.length - 1].teamID = teamID;;
      insert_to_db('leds', data[data.length - 1]);
      //console.log(data);
    }
  });

  options.url = 'http://10.0.0.10/api/din1/' + teamID + '/1'
  request(options, function(err, res, body) {
    if (err) throw err;
    var data = JSON.parse(body).data;
    if (data != undefined) {
      data[data.length - 1].teamID = teamID;;
      insert_to_db('din1', data[data.length - 1]);
      //console.log(data);
    }
  });

  options.url = 'http://10.0.0.10/api/din2/' + teamID + '/1'
  request(options, function(err, res, body) {
    if (err) throw err;
    var data = JSON.parse(body).data;
    if (data != undefined) {
      data[data.length - 1].teamID = teamID;;
      insert_to_db('din2', data[data.length - 1]);
      //console.log(data);
    }
  });

  options.url = 'http://10.0.0.10/api/din3/' + teamID + '/1'
  request(options, function(err, res, body) {
    if (err) throw err;
    var data = JSON.parse(body).data;
    if (data != undefined) {
      data[data.length - 1].teamID = teamID;;
      insert_to_db('din3', data[data.length - 1]);
      //console.log(data);
    }
  });

  options.url = 'http://10.0.0.10/api/din4/' + teamID + '/1'
  request(options, function(err, res, body) {
    if (err) throw err;
    var data = JSON.parse(body).data;
    if (data != undefined) {
      data[data.length - 1].teamID = teamID;;
      insert_to_db('din4', data[data.length - 1]);

      //console.log(data);
    }
  });

  options.url = 'http://10.0.0.10/api/din5/' + teamID + '/1'
  request(options, function(err, res, body) {
    if (err) throw err;
    var data = JSON.parse(body).data;
    if (data != undefined) {
      data[data.length - 1].teamID = teamID;;
      insert_to_db('din5', data[data.length - 1]);
      //console.log(data);
    }
  });
}

module.exports = get_data;