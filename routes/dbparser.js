exports.addToMongo = function(req, res) {

var csv = require('csv'),
	async = require('async'),
	fs = require('fs'),
	records = new Array(),
	records = [];
	
csv(records)
	.from.stream(fs.createReadStream('./incoming/collegeInfo.csv'), {
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

		
		async.eachSeries(records, function(info, callback) {
			
			collection.find({'UNITID': info.UNITID}).count(function(err, val) {
				
			if (val === 0){
				collection.insert(info, function (err, doc) {
					//console.log(doc);
				});
			}
			});

			callback();
		});
		
		
	});
	

});
	//console.log('Number of lines: ' + count);	

	res.render('addToDB_success', {title: 'Database Add Success!'});
};