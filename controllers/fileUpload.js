module.exports = {
	fUpload : function(fileName, path) {
		var fs = require('fs');
		
		var tmp_path = path;
		// set where the file should actually exists - in this case it is in the "incoming" directory
		var target_path = './incoming/' + fileName;
		// move the file from the temporary location to the intended location
		fs.renameSync(tmp_path, target_path, function(err) {
			if (err) throw err;
			// delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
			fs.unlink(tmp_path, function() {
				if (err) throw err;
			});
		});
	
	},
	
	csvParser: function(dir) {
		var csv = require('csv'),
			fs = require('fs'),
			records = [];
		
		csv(records)
			.from.stream(fs.createReadStream(dir), {
			columns: true
		})
			.on('record', function (row, index) {
			records.push(row);
		})
			.on('end', function (count) {
			console.log("CSV parsing completed!");
			console.log(records.length);
		});
		
		return records;
	}
	
};

