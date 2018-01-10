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

router.get('/:table/:teamID/:N', function(req, res){
    var table = req.params.table;
    var teamID = req.params.teamID;
    var N = req.params.N;
    var query = db.model(table).find({teamID:teamID});
    if(N != 'all'){
        query = query.limit(parseInt(N));
    }
    query.exec(function(err, data){
        if(err) {
            res.send(err);
        } else if(data.length == 0){
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
            console.log(data);
            res.render(table, {data : data});
        }
    });
});

router.get(':time/:table/:teamID/', function(req, res){
    var table = req.params.table;
    var teamID = req.params.teamID;
    var time = req.params.time;
    var query = db.model(table).find({teamID:teamID});
    if(N != 'all'){
        query = query.limit(parseInt(N));
    }
    query.exec(function(err, data){
        if(err) {
            res.send(err);
        } else if(data.length == 0){
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
            console.log(data);
            res.render('request', {data : data});
        }
    });
});


router.post('/:table', function(req, res){
    var table = req.params.table;
    var schema = db.model(table);
    var data = new schema(req.body);
    data.save(function(err, result){
        if (err) res.send(err);
        else res.send('success');
    });
});

router.post('/time/:table/:teamID', function(req, res){
    var table = req.params.table;
    // var schema = db.model(table);
    // var data = new schema(req.body);
    // data.save(function(err, result){
    //     if (err) res.send(err);
    //     else res.send('success');
    // });
      time = req.body.time;
      table = req.params.table;
      teamID = req.params.teamID;
    if(typeof time === 'Date'){

      res.redirect();
    }
});

module.exports = router;
