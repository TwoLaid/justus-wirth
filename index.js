var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var fs = require('fs');
var ejs = require('ejs');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(compression());

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (request, response) {
  response.render('pages/tonmeister/index', {
    activePage: 'tonmeister'
  });
});

app.get('/impressum', function (request, response) {
  response.render('pages/imprint', {
    activePage: 'impressum'
  });
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});


// create dist
var pages = [
  { name: 'index', template: 'pages/tonmeister/index', config: { activePage: 'tonmeister' } },
  { name: 'impressum', template: 'pages/imprint', config: { activePage: 'impressum' } },
];


for (var p of pages) {
  ejs.renderFile('views/' + p.template + '.ejs', p.config, function (err, result) {
    if (err) {
      return console.log(err);
    }

    fs.writeFile("dist/" + p.name + ".html", result, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  });
}