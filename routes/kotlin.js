var express = require('express');
var router = express.Router();
var utils = require('./utils');

var jsonParser = function (req, res, next) {
	req.body = JSON.parse(Object.keys(req.body)[0])

	next()
}

/* POST generate zipped Kotlin app base files. */
router.post('/zip/kotlin', jsonParser, function(req, res, next) {
	try {
		res.json({
			"ok": true,
			"content": "Work in Progress"
		})
	} catch(ex) {
		res.json({
			"ok": false,
			"content": ex.message
		})
	}
});

module.exports = router;