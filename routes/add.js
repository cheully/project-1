
/*
 * Add additional information to existing documents
 */
 
exports.additionalfiles = function(req, res) {
	res.render('moreupload', {title: 'Upload additional file', filetype:'data', location:'/upload/additional-uploaded'});
};

exports.additional_success = function( req, res, next) {
	/*for (var i=0; i<req.files.csvFile.length; i++){
	console.log(req.files.csvFile[i].name);
	}*/

	var fs = require('fs');
	var fileName = req.files.csvFile.name;
	
	if(fileName === '') {

		res.render('error', {title: 'Upload Error!', msg: 'No file selected! Please upload a file!', location: '/additionaluploads'} );
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
			var ID = records[0]['UNITID'];
			var totalCount = 0;
			var maleCount = 0;
			var femaleCount = 0;
			
			for(var i in records){
				
				if ( ID === records[i]['UNITID'] ) {
					// Add the values of the current object to the variables
					totalCount = totalCount + parseInt(records[i]['EFTOTLT']);
					maleCount = maleCount + parseInt(records[i]['EFTOTLM']);
					femaleCount = femaleCount + parseInt(records[i]['EFTOTLW']);
					
					// If it is the last record, add it to the database
					if( i === records.length - 1) {
						var obj = new Object();
						obj['GENDER'] = {'Total Enrollment' : totalCount, 'Male Enrollment' : maleCount, 'Female Enrollment' : femaleCount};
						
							collection.update({'UNITID': ID}, { $push: obj }, function(err, val) {
							
								console.log('Updated!');
							});
							
						break;
					}
				
				} else {
					
					var obj = new Object();
					obj['GENDER'] = {'Total Enrollment' : totalCount, 'Male Enrollment' : maleCount, 'Female Enrollment' : femaleCount};
						
						collection.update({'UNITID': ID}, { $push: obj }, function(err, val) {
							
							console.log('Updated!');
						});
					
					// Reset the four variables with the current values
					ID = records[i]['UNITID'];
					totalCount = parseInt(records[i]['EFTOTLT']);
					maleCount = parseInt(records[i]['EFTOTLM']);
					femaleCount = parseInt(records[i]['EFTOTLW']);
				}
			}
		});
	});
	//res.render('addToDB_success', {title: 'Database Update Success!', location:'/'});
	}
};

