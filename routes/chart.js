/*
	Show the different graphs
*/
	
exports.bargraph = function(req, res) {
	// Connecting to the mongodb database with the information from the institution document

	var c = rekuire('connect.js'),
		db = c.iConnect();
	
	// Get all the institutions' specified fields and sort them based on Total Enrollment in descending order
	db.find({}, {"UNITID": 1, "INSTNM": 1, "ENROLLMENT.Total Enrollment":1}).sort({"ENROLLMENT.Total Enrollment": -1}, function(err, info) {

		var list = new Array(); // Array to store the top 10 institutions
		
		for (var i in info) {
			if (i != 10) // Stop at the 11th object
			{
				var obj = new Object(); // Object that will store the edited key-value pairs
				
				for (var key in info[i]) {
					if (key === "ENROLLMENT") {
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
		
		console.log("List to send to jade view: " + list);
		// Render bargraph with the title and lists
		res.render('bargraph', {title: 'The Top 10 Institutions', topSchools: list});
	});
};

exports.viewInfo = function(req, res) {
	var c = rekuire('connect.js'),
		db = c.iConnect();
	
	// Get all the institutions' specified fields and sort them based on Total Enrollment in descending order
	db.find({"UNITID": req.params.sid}, {"INSTNM":1, "ENROLLMENT.Male Enrollment":1, "ENROLLMENT.Female Enrollment":1, "TUITION": 1}, function(err, info) {
		
		var list = new Array(); // Array to store the top 10 institutions
		//console.log(info);
		var longTitle = "More information for " + info[0]["INSTNM"];
		
		for (var key in info[0]) {
			
			if (key === "ENROLLMENT") {
				// Recognizing the stored objects in info and converting it to integer

				var obj = new Object();
				obj["Female"] = parseInt(JSON.stringify(info[0][key][0]["Female Enrollment"]));
				list.push(obj);
				
				var obj = new Object();
				obj["Male"] = parseInt(JSON.stringify(info[0][key][0]["Male Enrollment"]));
				list.push(obj);	// Put new object into list
			}
			
			if (key === "TUITION") {
				for (var item in info[0][key]) {
					list.push(info[0][key][item]);
				}
			}
		}
		console.log("List to send to jade view: " + list.sort());
		// Render bargraph with the title and lists
		res.render('moregraphs', {title: longTitle, institutionInfo: list});
	});
	


};

exports.tests = function(req, res) {
	res.render('testPage', {title: 'QUnit Test'} );
};