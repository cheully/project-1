/*
	Show the different graphs
*/
	
exports.bargraph = function(req, res) {
	// Connecting to the mongodb database with the information from the institution document
	var dburl = 'localhost:27017/IPEDS_Documentation';
	var collection = ['institutions'];
	var db = require('mongojs').connect(dburl, collection);
	
	// Get all the institutions' specified fields and sort them based on Total Enrollment in descending order
	db.institutions.find({}, {"UNITID": 1, "INSTNM": 1, "GENDER.Total Enrollment":1}).sort({"GENDER.Total Enrollment": -1}, function(err, info) {

		var list = new Array(); // Array to store the top 10 institutions
		
		for (var i in info) {
			if (i != 10) // Stop at the 11th object
			{
				var obj = new Object(); // Object that will store the edited key-value pairs
				
				for (var key in info[i]) {
					if (key === "GENDER") {
						// Recognizing the stored objects in info and converting it to integer
						obj["Total"] = parseInt(JSON.stringify(info[i][key][0]["Total Enrollment"]));
					} else {
						obj[key] = info[i][key];
					}
				}
				list.push(obj); // Put new object into list
				
			} else
				break;
		}
		
		//console.log(list);
		// Render bargraph with the title and lists
		res.render('bargraph', {title: 'Bar Graph', topSchools: list});
	});
};

exports.viewInfo = function(req, res) {
	var dburl = 'localhost:27017/IPEDS_Documentation';
	var collection = ['institutions'];
	var db = require('mongojs').connect(dburl, collection);
	
	// Get all the institutions' specified fields and sort them based on Total Enrollment in descending order
	db.institutions.findOne({"INSTNM": req.params.sid}, {"GENDER.Male Enrollment":1, "GENDER.Female Enrollment":1}, function(err, info) {
		
		var genderList = new Array(); // Array to store the top 10 institutions
		var longTitle = "Information for " + req.params.sid;
		
		for (var key in info) {
			
			if (key === "GENDER") {
				// Recognizing the stored objects in info and converting it to integer

				var obj = new Object();
				obj["Female"] = parseInt(JSON.stringify(info[key][0]["Female Enrollment"]));
				genderList.push(obj);
				
				var obj = new Object();
				obj["Male"] = parseInt(JSON.stringify(info[key][0]["Male Enrollment"]));
				genderList.push(obj);	// Put new object into list
				} 

		}
		console.log(genderList);
		// Render bargraph with the title and lists
		res.render('moregraphs', {title: longTitle, genderRatio: genderList});
	});
	


};

