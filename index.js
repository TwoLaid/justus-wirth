var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(request, response) {
  response.render('pages/landing');
});

app.get('/musik', function(request, response) {
  response.render('pages/music/index', {
    activePage: 'musik'
  });
});

app.get('/tonmeister', function(request, response) {
  response.render('pages/tonmeister/index', {
    activePage: 'tonmeister'
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
