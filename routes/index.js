var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) 
{
  res.render('index', { title: 'Express' });
});

router.post('/choose-language', function(req, res, next) {
  try
  {
    res.json({body : "<p>CHOOSE LANGUAGE</p>", url: "create-models"});
  }
  catch(ex)
  {
    res.render('error', { message: ex });
  }
});

router.post('/create-models', function(req, res, next) {
  try
  {
    res.json({body : "<p>CREATE MODELS</p>", url: ""});
  }
  catch(ex)
  {
    res.render('error', { message: ex });
  }
});

module.exports = router;
