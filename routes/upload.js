exports.file_success = function( req, res, next) {

	var fs = require('fs');
	var fileName = req.files.csvFile.name;
	
	if(fileName === '') {
		res.render('error', {title: 'Upload Error!', msg: 'No file selected! Please upload a file!', location: '/fileupload'} );
		var tmp_path = req.files.csvFile.path;
		
			// delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
			fs.unlink(tmp_path, function(err) {
				if (err) throw err;
			});
		
	} else {		
		// get the temporary location of the file
		var tmp_path = req.files.csvFile.path;
		// set where the file should actually exists - in this case it is in the "incoming" directory
		var target_path = './incoming/' + fileName;
		// move the file from the temporary location to the intended location
		fs.rename(tmp_path, target_path, function(err) {
			if (err) throw err;
			// delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
			fs.unlink(tmp_path, function() {
				if (err) throw err;
				//res.render('upload_success', {title: 'Success!'} );
			});
		});
		
	var csv = require('csv'),
		async = require('async'),
		fs = require('fs'),
		records = new Array(),
		records = [];
	
	csv(records)
		.from.stream(fs.createReadStream('./incoming/' + fileName), {
		columns: true
	})
		.on('record', function (row, index) {
		records.push(row);
	})
		.on('end', function (count) {
		var MongoClient = require('mongodb').MongoClient;
		
	   // Connect to the db
		MongoClient.connect("mongodb://localhost:27017/IPEDS_Documentation", function (err, db) {
			if(err) throw err;
			
			var collection = db.collection('institutions');

			async.eachSeries(records, function(info, callback) {
				
				collection.find({'UNITID': info.UNITID}).count(function(err, val) {
					
				if (val === 0){
					collection.insert(info, function (err, doc) {
					});
				}
				});
				callback();
			});
		});
	});
	res.render('addToDB_success', {title: 'Database Add Success!', location:'/'});
	}
};

exports.description_success = function( req, res, next) {

	var fs = require('fs');
	var fileName = req.files.csvFile.name;
	
	if(fileName === '') {
		res.render('error', {title: 'Upload Error!', msg: 'No file selected! Please upload a file!', location: '/descriptionupload'} );
		var tmp_path = req.files.csvFile.path;
		
			// delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
			fs.unlink(tmp_path, function(err) {
				if (err) throw err;
			});
		
	} else {	
		// get the temporary location of the file
		var tmp_path = req.files.csvFile.path;
		// set where the file should actually exists - in this case it is in the "incoming" directory
		var target_path = './incoming/' + fileName;
		// move the file from the temporary location to the intended location
		fs.rename(tmp_path, target_path, function(err) {
			if (err) throw err;
			// delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
			fs.unlink(tmp_path, function() {
				if (err) throw err;
				//res.render('upload_success', {title: 'Success!'} );
			});
		});
		
	var csv = require('csv'),
		async = require('async'),
		fs = require('fs'),
		records = new Array(),
		records = [];
	
	csv(records)
		.from.stream(fs.createReadStream('./incoming/' + fileName), {
		columns: true
	})
		.on('record', function (row, index) {
		records.push(row);

	})
		.on('end', function (count) {
		var MongoClient = require('mongodb').MongoClient;
	   // Connect to the db
		MongoClient.connect("mongodb://localhost:27017/IPEDS_Documentation", function (err, db) {
			if(err) throw err;
			
			var collection = db.collection('descrip');

			async.eachSeries(records, function(info, callback) {
				
				collection.find({'varnumber': info.varnumber}).count(function(err, val) {
					
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

		res.render('addToDB_success', {title: 'Database Add Success!', location:'/'});
		}
};

exports.frequency_success = function( req, res, next) {

	var fs = require('fs');
	var fileName = req.files.csvFile.name;
	
	if(fileName === '') {
		res.render('error', {title: 'Upload Error!', msg: 'No file selected! Please upload a file!', location:'/frequencyupload'} );
		var tmp_path = req.files.csvFile.path;
		
			// delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
			fs.unlink(tmp_path, function(err) {
				if (err) throw err;
			});
		
	} else {	
		// get the temporary location of the file
		var tmp_path = req.files.csvFile.path;
		// set where the file should actually exists - in this case it is in the "incoming" directory
		var target_path = './incoming/' + fileName;
		// move the file from the temporary location to the intended location
		fs.rename(tmp_path, target_path, function(err) {
			if (err) throw err;
			// delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
			fs.unlink(tmp_path, function() {
				if (err) throw err;
				//res.render('upload_success', {title: 'Success!'} );
			});
		});
		
	var csv = require('csv'),
		async = require('async'),
		fs = require('fs'),
		records = new Array(),
		records = [];
	
	csv(records)
		.from.stream(fs.createReadStream('./incoming/' + fileName), {
		columns: true
	})
		.on('record', function (row, index) {
		records.push(row);

	})
		.on('end', function (count) {
		var MongoClient = require('mongodb').MongoClient;
	   // Connect to the db
		MongoClient.connect("mongodb://localhost:27017/IPEDS_Documentation", function (err, db) {
			if(err) throw err;
			
			var collection = db.collection('freq');

			async.eachSeries(records, function(info, callback) {
				
				collection.find({'varnumber': info.varnumber}).count(function(err, val) {
					
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

		res.render('addToDB_success', {title: 'Database Add Success!', location:'/'});
		}
};
