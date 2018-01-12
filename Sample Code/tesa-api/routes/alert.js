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

// POST alert
// team id : int
// description : string

router.post('/:teamID/:description', function(req, res) {
  var teamID = req.params.teamID;
  var description = req.params.description;
  var row = {
    'teamID': teamID,
    'description': description,
  }
  insert_to_db('eventStack', row);
  res.send('success');
});

module.exports = router;