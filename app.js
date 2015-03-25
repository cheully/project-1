var express = require('express'),
   fs = require('fs'),
   routes = require('./routes'),
   user = require('./routes/user'),
   http = require('http'),
   csv = require('csv'),
   path = require('path');
   async = require('async');
var records = new Array();
var app = express();
var records = [];

csv(records)
	.from.stream(fs.createReadStream(__dirname + '/hd2013.csv'), {
	columns: true
})
	.on('record', function (row, index) {
	records.push(row);

   //console.log(row);
})
	.on('end', function (count) {
	var MongoClient = require('mongodb').MongoClient;
   // Connect to the db
	MongoClient.connect("mongodb://localhost:27017/exampleDb", function (err, db) {
		if(err) throw err;
		
		var collection = db.collection('sample');
<<<<<<< HEAD
=======
		
		collection.find().count( function(err, val) {
			
				
		if (val === 0){
>>>>>>> origin/master
		
		async.eachSeries(records, function(info, callback) {
			
			collection.find({'UNITID': info.UNITID}).count(function(err, val) {
				
			if (val === 0){
				collection.insert(info, function (err, doc) {
					//console.log(doc);
				});
			}
			});
<<<<<<< HEAD
			callback();
		});
		
=======
		}
	});
	
>>>>>>> origin/master
	});
	//console.log('Number of lines: ' + count);	
});

app.configure(function () {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
	app.use(express.errorHandler());
});

app.get('/', routes.index); //This shows the list of all the universities in the csv file
app.get('/:id', user.list); //This give the user.js the address to show an university's info

http.createServer(app).listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});
