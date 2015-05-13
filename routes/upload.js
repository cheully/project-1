exports.file_success = function(req, res) {

	var upload = rekuire('fileUpload.js'),
		m = rekuire('mongoClient_Upload.js'),
		dir = './incoming/' + req.files.csvFile.name;
		//c = rekuire('connect.js').iConnect();
			
	// Uploads the csv file to the incoming folder	
	upload.fUpload(req.files.csvFile.name, req.files.csvFile.path);
	
	// Parses the csv file into an array of objects
	var records = upload.csvParser(dir);

	
	// Uploads the information for the institutions from array to mongoDB
	m.mongoUpload('institutions', records, res);

};

exports.description_success = function( req, res, next) {

	var upload = rekuire('fileUpload.js'),
		m = rekuire('mongoClient_Upload'),
		dir = './incoming/' + req.files.csvFile.name;
	// Uploads the csv file to the incoming folder	
	upload.fUpload(req.files.csvFile.name, req.files.csvFile.path);
	
	// Parses the csv file into an array of objects
	var records = upload.csvParser(dir);
	
	// Uploads the information for the descriptions from array to mongoDB
	m.mongoUpload('descrips', records, res);

};

exports.frequency_success = function( req, res, next) {

	var upload = rekuire('fileUpload.js'),
		m = rekuire('mongoClient_Upload'),
		dir = './incoming/' + req.files.csvFile.name;
	// Uploads the csv file to the incoming folder	
	upload.fUpload(req.files.csvFile.name, req.files.csvFile.path);
	
	// Parses the csv file into an array of objects
	var records = upload.csvParser(dir);
	
	// Uploads the information for the frequencies from array to mongoDB
	m.mongoUpload('frequencies', records, res);

};