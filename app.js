var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var app        = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//DB setup
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://mongo:27017", {
	keepAlive: true,
	reconnectTries: Number.MAX_VALUE,
	useMongoClient: true
});

app.get('/', function(req, res){
  res.send("Hello World");
});

app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});