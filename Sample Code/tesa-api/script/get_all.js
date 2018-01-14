var https = require('https');
var request = require('request');
var mongoose = require('mongoose');
var async = require('async');

var schema = require('../models/schema');
var db = require('../models/db');
var get_data = require('./get_data');

var teamIDs = [10, 11, 12, 13, 14, 15, 16, 18, 19, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
  33, 34, 35, 37, 38, 39, 40, 43, 44, 46, 47,
  48, 49, 50, 51, 52, 53, 54, 60, 61
]

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

function getee_all(interval) {

  console.log(teamIDs);
  var collect_data = [];
  for (var team = 0; team < teamIDs.length; team++) {
    collect_data.push(get_one(teamIDs[team]));
  }
  setInterval(function() {
    Promise.all(collect_data)
      .catch((err) => {
        console.log(err);
      });
  }, interval);

  // console.log('wtf');
}

async function geteee_all(interval) {
  // var collect_data = [];
  // for (var team = 0; team < teamIDs.length; team++) {
  //   const res = await get_one(teamIDs[team]);
  //
  // }
  setInterval(function() {
    get_one(10)
      .then(get_one(11))
      .then(get_one(12))
      .then(get_one(13))
      .then(get_one(14))
      .then(get_one(15))
      .then(get_one(16))
      .then(get_one(18))
      .then(get_one(19))
      .then(get_one(21))
      .then(get_one(22))
      .then(get_one(23))
      .then(get_one(24))
      .then(get_one(25))
      .then(get_one(26))
      .then(get_one(27))
      .then(get_one(28))
      .then(get_one(29))
      .then(get_one(30))
      .then(get_one(31))
      .then(get_one(32))
      .then(get_one(33))
      .then(get_one(34))
      .then(get_one(35))
      .then(get_one(37))
      .then(get_one(38))
      .then(get_one(39))
      .then(get_one(40))
      .then(get_one(43))
      .then(get_one(44))
      .then(get_one(46))
      .then(get_one(47))
      .then(get_one(48))
      .then(get_one(49))
      .then(get_one(50))
      .then(get_one(51))
      .then(get_one(52))
      .then(get_one(53))
      .then(get_one(54))
      .then(get_one(60))
      .then(get_one(61))
      .catch(console.log('555555555555555555TT55555555'));
  }, interval);

}

function get_one(teamID) {
  return new Promise((resolve, reject) => {
    goot_data(teamID);
    setTimeout(function() {
      resolve();
    }, 500);
  })
}

// function goot_all(interval) {
//   var collect = []
//   forEach(teamIDs) {
//     function(team) {
//       collect.push(goot_data(teamIDs[team]));
//     }
//     function(collect) {
//       collect.reduce((p, fun) => {
//         p.then(fun), (Promise.resolve())
//       })
//     }
// }

function goot_data(teamID) {
  console.log('adding data from team ' + teamID);
  return new Promise((resolve, reject) => {

    var options = ({
      method: 'GET',
      // agent: agent,
      header: {
        'Content-Type': 'application/json'
      }
    });
    options.url = 'http://10.0.0.10/api/temperature/' + teamID + '/1'
    request(options, function(err, res, body) {
      if (err) reject(err);
      //console.log(res);
      // if ()
      var data = JSON.parse(body).data;
      if (data != undefined) {
        data[data.length - 1].teamID = teamID;;
        insert_to_db('temperature', data[data.length - 1]);
        //console.log(data);
      }
    });

    options.url = 'http://10.0.0.10/api/accelerometer/' + teamID + '/1'
    request(options, function(err, res, body) {
      if (err) reject(err);
      //console.log(res);
      var data = JSON.parse(body).data;
      if (data != undefined) {
        data[data.length - 1].teamID = teamID;;
        insert_to_db('accelerometer', data[data.length - 1]);

        //console.log(data);
      }
    });


    options.url = 'http://10.0.0.10/api/din1/' + teamID + '/1'
    request(options, function(err, res, body) {
      if (err) reject(err);
      //console.log(res);
      var data = JSON.parse(body).data;
      if (data != undefined) {
        data[data.length - 1].teamID = teamID;;
        insert_to_db('din1', data[data.length - 1]);
        //console.log(data);
      }
    });
    resolve();
  });
}

function get_all(interval) {
  setTimeout(function() {
    setInterval(function() {
      get_data(10);
    }, interval);
  }, 500)

  setTimeout(function() {
    setInterval(function() {
      get_data(11);
    }, interval);
  }, 1500)

  setTimeout(function() {
    setInterval(function() {
      get_data(12);
    }, interval);
  }, 2000)

  setTimeout(function() {
    setInterval(function() {
      get_data(13);
    }, interval);
  }, 2500)

  setTimeout(function() {
    setInterval(function() {
      get_data(14);
    }, interval);
  }, 3000)

  setTimeout(function() {
    setInterval(function() {
      get_data(15);
    }, interval);
  }, 4000)


  setTimeout(function() {
    setInterval(function() {
      get_data(16);
    }, interval);
  }, 4500)


  setTimeout(function() {
    setInterval(function() {
      get_data(18);
    }, interval);
  }, 5000)


  setTimeout(function() {
    setInterval(function() {
      get_data(19);
    }, interval);
  }, 5500)

  setTimeout(function() {
    setInterval(function() {
      get_data(21);
    }, interval);
  }, 6000)

  setTimeout(function() {
    setInterval(function() {
      get_data(22);
    }, interval);
  }, 6500)

  setTimeout(function() {
    setInterval(function() {
      get_data(23);
    }, interval);
  }, 7000)

  setTimeout(function() {
    setInterval(function() {
      get_data(24);
    }, interval);
  }, 7500)

  setTimeout(function() {
    setInterval(function() {
      get_data(25);
    }, interval);
  }, 8000)

  setTimeout(function() {
    setInterval(function() {
      get_data(26);
    }, interval);
  }, 8500)

  setTimeout(function() {
    setInterval(function() {
      get_data(27);
    }, interval);
  }, 9000)

  setTimeout(function() {
    setInterval(function() {
      get_data(28);
    }, interval);
  }, 9500)

  setTimeout(function() {
    setInterval(function() {
      get_data(29);
    }, interval);
  }, 10000)

  setTimeout(function() {
    setInterval(function() {
      get_data(30);
    }, interval);
  }, 10500)

  setTimeout(function() {
    setInterval(function() {
      get_data(31);
    }, interval);
  }, 11000)

  setTimeout(function() {
    setInterval(function() {
      get_data(32);
    }, interval);
  }, 11500)

  setTimeout(function() {
    setInterval(function() {
      get_data(33);
    }, interval);
  }, 12000)

  setTimeout(function() {
    setInterval(function() {
      get_data(34);
    }, interval);
  }, 12500)

  setTimeout(function() {
    setInterval(function() {
      get_data(35);
    }, interval);
  }, 13000)

  setTimeout(function() {
    setInterval(function() {
      get_data(37);
    }, interval);
  }, 13500)

  setTimeout(function() {
    setInterval(function() {
      get_data(38);
    }, interval);
  }, 14000)

  setTimeout(function() {
    setInterval(function() {
      get_data(39);
    }, interval);
  }, 14500)

  setTimeout(function() {
    setInterval(function() {
      get_data(40);
    }, interval);
  }, 15000)

  setTimeout(function() {
    setInterval(function() {
      get_data(43);
    }, interval);
  }, 15500)

  setTimeout(function() {
    setInterval(function() {
      get_data(44);
    }, interval);
  }, 16000)

  setTimeout(function() {
    setInterval(function() {
      get_data(46);
    }, interval);
  }, 16500)

  setTimeout(function() {
    setInterval(function() {
      get_data(47);
    }, interval);
  }, 17000)

  setTimeout(function() {
    setInterval(function() {
      get_data(48);
    }, interval);
  }, 17500)

  setTimeout(function() {
    setInterval(function() {
      get_data(49);
    }, interval);
  }, 18000)

  setTimeout(function() {
    setInterval(function() {
      get_data(50);
    }, interval);
  }, 18500)

  setTimeout(function() {
    setInterval(function() {
      get_data(51);
    }, interval);
  }, 19000)

  setTimeout(function() {
    setInterval(function() {
      get_data(52);
    }, interval);
  }, 19500)

  setTimeout(function() {
    setInterval(function() {
      get_data(53);
    }, interval);
  }, 20000)

  setTimeout(function() {
    setInterval(function() {
      get_data(54);
    }, interval);
  }, 20500)

  setTimeout(function() {
    setInterval(function() {
      get_data(60);
    }, interval);
  }, 21000)

  setTimeout(function() {
    setInterval(function() {
      get_data(61);
    }, interval);
  }, 21500)
}
// function get_in_order(team, callback) {
//   if (teamIDs[team] == undefined) {
//
//     return null;
//   } else {
//     get_one(team);
//     callback();
//   }
// }
//
// function get_one(team) {
//   get_data(teamIDs[team]);
// }

module.exports = get_all;