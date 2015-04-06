
/*
 * GET institution listing.
 */
 
exports.list = function(req, res, next){
	// These lines connect to the mongodb database to get the collections 'sample' that has the universities
	var dburl = 'localhost:27017/IPEDS_Documentation';
	
	var headings = ['descrip'];
	var collection = ['institutions'];
	var baseInfo = ['freq'];
			
	var db = require('mongojs').connect(dburl, headings);
	var db2 = require('mongojs').connect(dburl, collection);
	var db3 = require('mongojs').connect(dburl, baseInfo);
	
	// Finds the headings for the table in the descrip document
	db.descrip.find().sort({'varname':1}, function (err, titleHeads) {
		
		// Finds the specific information for a requested school
		db2.institutions.find({'UNITID': req.params.id}, function(err, schoolInfo) {
			
			// Loop to go through each key in the schoolInfo object
			Object.keys(schoolInfo[0]).forEach(function (key) {
				var strKey = key.toString();
				
				// Finds the long description of the specific key using the codevalue and varname fields
				db3.freq.find({ $and: [{'varname': strKey}, {'codevalue': schoolInfo[0][strKey]}]}, function (err, info) {
							
					// Had to use a loop to actually access the key of the info object
					for (k in info) {
						// Replace shorted value stored in the key with the long description of the value
						schoolInfo[0][strKey] = info[k].valuelabel;
					}
							
					// Condition to check if we are at the last key of schoolInfo
					if(key === "LATITUDE") {
						var keys = Object.keys(schoolInfo[0]),
							arrOfInfo = new Array,
							obj = new Object,
							i, len = keys.length;
							
						keys.sort();
						
						for (i=0; i<len; i++){
							var k = keys[i];
							if ( k === "INSTNM" || k === "_id") {continue};
							
							obj[k] = schoolInfo[0][k];
							//arrOfInfo.push(val);
						}
						
						console.log(obj);
						// Render schoollist view with the following properties
						res.render('schoollist', { title: 'Info', list : obj, heads: titleHeads, schoolTitle: schoolInfo[0]['INSTNM']});
						
					}
				});							
			});	
		});
	});
};
