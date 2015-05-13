
/*
 * Add additional information to existing documents
 */
 
exports.additionalfiles = function(req, res) {
	res.render('moreupload', {title: 'Upload additional file', filetype:'data', location:'/choose/upload'});
};

exports.enrollment_success = function(req, res) {

	var upload = rekuire('fileUpload.js'),
		m = rekuire('mongoClient_Upload'),
		dir = './incoming/' + req.files.csvFile.name;
	
	// Uploads the csv file to the incoming folder	
	upload.fUpload(req.files.csvFile.name, req.files.csvFile.path);
	
	// Parses the csv file into an array of objects
	var records = upload.csvParser(dir);
	
	// Uploads the enrollment information for the institutions from array to mongoDB
	m.mongoEnrollments(records, res);
	
};


exports.tuition_success = function(req, res) {

	var fileName = req.files.csvFile.name,
		year = '20' + fileName.substring(3,5),
		upload = rekuire('fileUpload.js'),
		m = rekuire('mongoClient_Upload'),
		dir = './incoming/' + fileName;
	
	// Uploads the csv file to the incoming folder	
	upload.fUpload(fileName, req.files.csvFile.path);
	
	// Parses the csv file into an array of objects
	var records = upload.csvParser(dir);
	
	// Uploads the enrollment information for the institutions from array to mongoDB
	m.mongoTuitions(year, records, res);

};


