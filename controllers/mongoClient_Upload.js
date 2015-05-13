module.exports = {
	
	mongoUpload : function(name, records, res) {
	
		var db = rekuire('db.js'); // Get databse connection
		
		// Function to generate query 
		var queryRun = function (n, val) {
			if (n === "institutions") { return {"UNITID": val["UNITID"]}; }
			
			else { return {"varnumber": val["varnumber"]}; }
		
		};
		
		// Creating the right model for the type of file uploaded
		switch (name) {
			case "institutions":
				var Model = rekuire('insertLayout.js').Institution;
				break;
				
			case "descrips":
				var Model = rekuire('insertLayout.js').Description;
				break;
				
			case "frequencies":
				var Model = rekuire('insertLayout.js').Frequency;
				break;
				
			default:
				console.log(name + " does not exist in mongoDB!");
				break;
		}

		db.on('open', function() {
			// Function to insert one record at a time
			function insertAll(i) {
					insertOne(i);
					i++;
					if ( i < records.length) {
						setImmediate(insertAll, i);	
					}
				}
			
			function insertOne(i) {
				if (name === "frequencies") {
			
					Model.insert(records[i], function (err, doc) {
						console.log("Saved");
						
					});
					
				} else {
					var data = records[i];
					var query = queryRun(name, records[i]);
					
					
					Model.findOneAndUpdate(query, data, {upsert:true}, function( err, doc){
						if (err) throw err;
						if (doc == null) {console.log("New insert:\n", data)};
						
					});
				}
				
			}
				
			insertAll(0);
		
		
		// Timeout before rendering the page 
		setTimeout(function () {
				res.render('addToDB_success', {title: 'Database Add Success!', location:'/'});
		}, 150*records.length);	
		
		});
		
		

	},
	
	mongoEnrollments : function(records, res) {
		var Model = rekuire('insertLayout.js').Institution;
		var db = rekuire('db.js');
		
		db.on('open', function() {
			// Creating initial variables before calculations
			var ID = records[0]['UNITID'];
			var totalCount = 0;
			var maleCount = 0;
			var femaleCount = 0;
				
			function insertAll(i) {
					insertOne(i);
					i++;
					if ( i < records.length) {
						setImmediate(insertAll, i);	
					}
				}
			
			function insertOne(i) {
				/* Add all the necessary values (female, male and total enrollments from 
					each record with the same UNITID until they do not match. If so,
					insert the values into their corresponding document. */
					
				if ((ID === records[i]['UNITID']) && (i != records.length - 1)) {
					
					totalCount = totalCount + parseInt(records[i]['EFTOTLT']);
					maleCount = maleCount + parseInt(records[i]['EFTOTLM']);
					femaleCount = femaleCount + parseInt(records[i]['EFTOTLW']);
				
				} else {
					var obj = {},
						query = {};
					query['UNITID'] = records[i-1]['UNITID'];
					obj['ENROLLMENT'] = [{'Total Enrollment' : totalCount, 'Male Enrollment' : maleCount, 'Female Enrollment' : femaleCount}];
					
					Model.update( query, {$set: obj}, function(err, doc) {
						console.log(doc);
					});
					
					ID = records[i]['UNITID'];
					totalCount = parseInt(records[i]['EFTOTLT']);
					maleCount = parseInt(records[i]['EFTOTLM']);
					femaleCount = parseInt(records[i]['EFTOTLW']);
				}
				
			}
	
			insertAll(0);
			
		setTimeout(function () {
			res.render('addToDB_success', {title: 'Database Add Success!', location:'/'});
		}, records.length/2);	
		
		});

	},
	
	mongoTuitions : function(year, records, res) {
	
		var mongoose = require('mongoose'),	
			db = mongoose.connection;
			mongoose.connect('mongodb://localhost:27017/IPEDS_Documentation');
			
		var Model = rekuire('insertLayout.js').Institution;
		var db = rekuire('db.js');
		
		db.on('open', function() {
			var query = {};
			query[year] = {$exists:true}; //Query to check if a tuition year exists
			
			// Remove any occurences of the year from the database
			Model.update({}, {$pull: {"TUITION": query} }, {multi:true}, function(err, doc) {
				console.log(doc);
			});	
			
			function insertAll(i) {
					insertOne(i);
					i++;
					if ( i < records.length) {
						setImmediate(insertAll, i);	
					}
				}
			
			function insertOne(i) {
			/* Get the necessary values for tuition and insert it into the corresponding document */
				var totalTuitions = parseInt(records[i]['F1B01']) +  parseInt(records[i]['F1E08']);
				var obj = {}, 
					obj2 = {};
					
				obj[year] = totalTuitions; 
				obj2["TUITION"] = obj;
				
				
				Model.update({'UNITID': records[i]['UNITID']}, {$push: obj2}, function(err, doc) {
					console.log(doc);
				});
				
				
				
			}
	
			insertAll(0);	
			
		setTimeout(function () {

			res.render('addToDB_success', {title: 'Database Add Success!', location:'/'});
		}, 10*records.length);	
		
		});

	}
};

