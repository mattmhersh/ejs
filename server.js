
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

// New Code
var user = require('./routes/user');
var markdown = require("markdown-js");  
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('ejs:sWeTruT3@ds061777.mongolab.com:61777/matthersh/');

//var app = module.exports = express.createServer();
var app = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

// HTTP Get
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/helloworld', routes.helloworld);
app.get('/userlist', routes.userlist(db));
app.get('/newuser', routes.newuser);
app.get('/markdown', routes.markdown);
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/movies', routes.movies);

// HTTP Post
app.post('/adduser', routes.adduser(db));

app.listen(process.env.port || 3000);
//console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
