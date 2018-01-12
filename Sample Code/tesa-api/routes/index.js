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

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = db.model('eventStack').findOneAndUpdate({
    view: false
  }, {
    view: true
  })

  query.exec(function(err, data) {
    if (err) {
      throw err;
    } else if (data === null) {
      res.render('index', {
        title: 'UNP',
        alert: null
      });
    } else {
      console.log(data);
      res.render('index', {
        title: 'UNP',
        alert: data
      });
    }
  });
});

module.exports = router;