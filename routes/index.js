var express = require('express');
var router = express.Router();
var path = require('path');

const phpFiles = path.join(require.main.filename, '/../../public/javascripts/files/php')

var jsonParser = function (req, res, next) {
	req.body = JSON.parse(Object.keys(req.body)[0])

	next()
}

/* GET home page. */
router.get('/', function(req, res, next) 
{
	res.render('index', { title: 'MVC Generator' });
});

router.post('/zip/php', jsonParser, function(req, res, next) {
	const files = []

	let teste = controllerAPI.getControllerAPIText(req.body.models)

	res.json({
		"ok": true,
		"content": createFileInstance("ControllerAPI.js", teste, "text/javascript")
	})
});

module.exports = router;