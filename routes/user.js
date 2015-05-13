
/*
 * GET institution listing.
 */
 
exports.list = function(req, res, next){
	// These lines connect to the mongodb database to get the collections 'sample' that has the universities
	var c = rekuire('connect.js');
	
	var instiDB = c.iConnect();
	var descripDB = c.dConnect();
	var freqDB = c.fConnect();
	
	// Finds the headings for the table in the descrip document
	descripDB.find({}).sort({'varname':1}, function (err, titleHeads) {
		
		// Finds the specific information for a requested school
		instiDB.find({'UNITID': req.params.id}, function(err, schoolInfo) {
			
			// Loop to go through each key in the schoolInfo object
			Object.keys(schoolInfo[0]).forEach(function (key) {

				//var strKey = key.toString().replace(/\s/g,'');
				
				if (key != "_id") {
					if( String(schoolInfo[0][key]) === "-2") {
						var checkval = "-2";
					} else {
						var checkval = String(schoolInfo[0][key]).replace(/\s/g,'');
					}
				} else {
				var checkval = schoolInfo[0][key];
				}
				// Finds the long description of the specific key using the codevalue and varname fields
				freqDB.find({ $and: [{'varname': key}, {'codevalue': checkval}]}, function (err, info) {
							
					// Had to use a loop to actually access the key of the info object
					for (k in info) {
						// Replace shorted value stored in the key with the long description of the value
						schoolInfo[0][key] = info[k].valuelabel;
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
							if ( k === "INSTNM" || k === "_id" || k === "ENROLLMENT" || k === "TUITION" || k === "__v" ) {continue}
							
							else if ( k === "NEWID" || k === "CLOSEDAT" ) {
								
								if (schoolInfo[0][k] === '-2') { obj[k] = "Not applicable"; };
							
							} else {obj[k] = schoolInfo[0][k]};
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
