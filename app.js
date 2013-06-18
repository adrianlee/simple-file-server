var express = require('express'),
  http = require('http'),
  path = require('path'),
  fs = require('fs');

var app = express();

// all environments
app.set('port', process.argv[2] || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.errorHandler());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', function (req, res) {
  fs.readdir('.', function (err, files) {
    res.send(files);
  });
});

app.get('/:path', function (req, res) {
  console.log(req.param('path'));
  res.sendfile(req.param('path'));
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});