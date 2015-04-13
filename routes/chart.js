exports.bargraph = function(req, res) {
	
	var dburl = 'localhost:27017/IPEDS_Documentation';
	var collection = ['institutions'];
	var db = require('mongojs').connect(dburl, collection);

	db.institutions.find({}, {"UNITID": 1, "INSTNM": 1, "GENDER.Total Enrollment":1}).sort({"GENDER.Total Enrollment": -1}, function(err, info) {
		var list = new Array();
		
		for (var i in info) {
			if (i != 9)
			{
				var obj = new Object();
				for (var key in info[i]) {
					if (key === "GENDER") {
						obj["Total"] = parseInt(JSON.stringify(info[i][key][0]["Total Enrollment"]));
					} else {
						obj[key] = info[i][key];
					}
				}
				list.push(obj);
				
			} else
				break;
		}
		console.log(list);
		res.render('bargraph', {title: 'Bar Graph', topSchools: list});
	});
};