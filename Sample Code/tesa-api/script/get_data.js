var https = require('https');
var request = require('request');
var mongoose = require('mongoose');

var schema = require('../models/schema');
var db = require('../models/db');

function insert_to_db(table, row) {
  var schema = db.model(table);
  var data = new schema(row);
  data.save(function(err, result) {
    if (err) {
      throw (err);
      console.log('dbError');
    }
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
      'Content-Type': 'application/json'
    }
  });

  //options.url = 'https://loraiot.cattelecom.com/api/pressure/'+teamID+'/1'

  // options.url = 'http://10.0.0.10/api/pressure/' + teamID + '/1'
  // request(options, function(err, res, body) {
  //   if (err) throw err;
  //   //console.log(res);
  //   var data = JSON.parse(body).data;
  //   if (data != undefined) {
  //     data[data.length - 1].teamID = teamID;
  //     insert_to_db('pressure', data[data.length - 1]);
  //     //console.log(data);
  //   }
  // });

  options.url = 'http://10.0.0.10/api/temperature/' + teamID + '/1'
  request(options, function(err, res, body) {
    if (err) throw err;
    //console.log(res);
    var data = JSON.parse(body).data;
    if (data != undefined) {
      data[data.length - 1].teamID = teamID;;
      insert_to_db('temperature', data[data.length - 1]);
      //console.log(data);
    }
  });

  // options.url = 'http://10.0.0.10/api/humidity/' + teamID + '/1'
  // request(options, function(err, res, body) {
  //   if (err) throw err;
  //   //console.log(res);
  //   var data = JSON.parse(body).data;
  //   if (data != undefined) {
  //     data[data.length - 1].teamID = teamID;;
  //     insert_to_db('humidity', data[data.length - 1]);
  //     //console.log(data);
  //   }
  // });

  // options.url = 'http://10.0.0.10/api/gyroscope/' + teamID + '/1'
  // request(options, function(err, res, body) {
  //   if (err) throw err;
  //   //console.log(res);
  //   var data = JSON.parse(body).data;
  //   if (data != undefined) {
  //     data[data.length - 1].teamID = teamID;;
  //     insert_to_db('gyroscope', data[data.length - 1]);
  //     //console.log(data);
  //   }
  // });

  options.url = 'http://10.0.0.10/api/accelerometer/' + teamID + '/1'
  request(options, function(err, res, body) {
    if (err) throw err;
    //console.log(res);
    var data = JSON.parse(body).data;
    if (data != undefined) {
      data[data.length - 1].teamID = teamID;;
      insert_to_db('accelerometer', data[data.length - 1]);
      //console.log(data);
    }
  });

  // options.url = 'http://10.0.0.10/api/magnetometer/' + teamID + '/1'
  // request(options, function(err, res, body) {
  //   if (err) throw err;
  //   //console.log(res);
  //   var data = JSON.parse(body).data;
  //   if (data != undefined) {
  //     data[data.length - 1].teamID = teamID;;
  //     insert_to_db('magnetometer', data[data.length - 1]);
  //     //console.log(data);
  //   }
  // });

  // options.url = 'http://10.0.0.10/api/leds/' + teamID + '/1'
  // request(options, function(err, res, body) {
  //   if (err) throw err;
  //   //console.log(res);
  //   var data = JSON.parse(body).data;
  //   if (data != undefined) {
  //     data[data.length - 1].teamID = teamID;;
  //     insert_to_db('leds', data[data.length - 1]);
  //     //console.log(data);
  //   }
  // });

  options.url = 'http://10.0.0.10/api/din1/' + teamID + '/1'
  request(options, function(err, res, body) {
    if (err) throw err;
    //console.log(res);
    var data = JSON.parse(body).data;
    if (data != undefined) {
      data[data.length - 1].teamID = teamID;;
      insert_to_db('din1', data[data.length - 1]);
      //console.log(data);
    }
  });

  // options.url = 'http://10.0.0.10/api/din2/' + teamID + '/1'
  // request(options, function(err, res, body) {
  //   if (err) throw err;
  //   //console.log(res);
  //   var data = JSON.parse(body).data;
  //   if (data != undefined) {
  //     data[data.length - 1].teamID = teamID;;
  //     insert_to_db('din2', data[data.length - 1]);
  //     //console.log(data);
  //   }
  // });
  //
  // options.url = 'http://10.0.0.10/api/din3/' + teamID + '/1'
  // request(options, function(err, res, body) {
  //   if (err) throw err;
  //   //console.log(res);
  //   var data = JSON.parse(body).data;
  //   if (data != undefined) {
  //     data[data.length - 1].teamID = teamID;;
  //     insert_to_db('din3', data[data.length - 1]);
  //     //console.log(data);
  //   }
  // });
  //
  // options.url = 'http://10.0.0.10/api/din4/' + teamID + '/1'
  // request(options, function(err, res, body) {
  //   if (err) throw err;
  //   //console.log(res);
  //   var data = JSON.parse(body).data;
  //   if (data != undefined) {
  //     data[data.length - 1].teamID = teamID;
  //     insert_to_db('din4', data[data.length - 1]);
  //
  //     //console.log(data);
  //   }
  // });
  //
  // options.url = 'http://10.0.0.10/api/din5/' + teamID + '/1'
  // request(options, function(err, res, body) {
  //   if (err) throw err;
  //   //console.log(res);
  //   var data = JSON.parse(body).data;
  //   if (data != undefined) {
  //     data[data.length - 1].teamID = teamID;;
  //     insert_to_db('din5', data[data.length - 1]);
  //     //console.log(data);
  //   }
  // });
}

var sensors = [
  'din1',
  'din2',
  'din3',
  'din4',
  'din5',
  'accelerometer',
  'temperature',
  'humidity',
  'magnetometer',
  'gyroscope',
  'leds',
  'pressure'
]

function gete_data() {
  var teamIDs = [10, 11, 12, 13, 14, 15, 16, 18, 19, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
    33, 34, 35, 37, 38, 39, 40, 43, 44, 46, 47,
    48, 49, 50, 51, 52, 53, 54, 60, 61
  ]
  var neat_list = [];
  for (var i = 0; i < teamIDs.length; i++) {
    neat_list.push(giit_data(teamIDs[i]));
  }
  neat_list.reduce((ret, prom) => ret.then(prom), Promise.resolve());
}

function giit_data(teamID) {
  console.log('adding data from team ' + teamID);
  var add_list = [];
  for (var i = 0; i < sensors.length; i++) {
    add_list.push(git_data(sensors[i], teamID));
  }
  add_list.reduce((ret, prom) => ret.then(prom), Promise.resolve());
}

function git_data(sensor, teamID) {
  var options = ({
    method: 'GET',
    // agent: agent,
    header: {
      'Content-Type': 'application/json'
    }
  });
  // return new Promise((resolve, reject) => {

  options.url = 'http://10.0.0.10/api/' + sensor + '/' + teamID + '/1'
  request(options, function(err, res, body) {
    if (err) {
      // reject(err);
      throw err;
    }
    //  else if (body.slice(0, 1) != '}') {
    //   // reject(err);
    //   console.log('noooo');
    // }
    else {
      //console.log(res);
      var data = JSON.parse(body).data;
      if (data != undefined) {
        data[data.length - 1].teamID = teamID;;
        insert_to_db('din5', data[data.length - 1]);
        // resolve();
        //console.log(data);
      }
    }
  });
  // });
}

module.exports = get_data;