// npm install express body-parser morgan node-yaml-config redis
var express = require('express');
var bodyParser = require('body-parser')
var morgan = require('morgan')
var value = require('./api/value')
var config = require('./config/config')


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(morgan('combined')); // logging


app.get('/api/value', value.get);
app.post('/api/value', value.post);

app.listen(config.server.port, function() {
    console.log('server listening on port ' + config.server.port);
});