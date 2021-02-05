var express = require('express');
var router = express.Router();

var jsonParser = function (req, res, next) {
	req.body = JSON.parse(Object.keys(req.body)[0])

	next()
}

/* GET home page. */
router.get('/', function(req, res, next) 
{
	res.render('index', { title: 'MVC Generator' });
});

module.exports = router;