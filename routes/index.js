
/*
 * Pages for home, uploads and college lists
 */

// Home page 
exports.indexes = function(req, res) {

	res.render('index', {title: 'Welcome to the IPEDS Data Center'});
};

exports.choose_upload = function(req, res) {
	res.render('choose', {title: 'Select an upload option'});
};

// Data file upload page
exports.file_upload = function(req, res) {
	res.render('upload', {title: 'Upload data file', filetype:'data', location:'/choose/upload/file-uploaded'});
};

// Description file upload page
exports.description_upload = function(req, res) {
	res.render('upload', {title: 'Upload description file', filetype:'description', location: '/choose/upload/description-uploaded'});
};

// Frequency file upload page
exports.frequency_upload = function(req, res) {
	res.render('upload', {title: 'Upload frequency file', filetype:'frequency', location: '/choose/upload/frequency-uploaded'});
};

//College List page
exports.colleges = function(req, res){
	var c = rekuire('connect.js');
	var db = c.iConnect();

	// Get all the institutions and sort them alphabetically
	db.find({}).sort({'INSTNM':1}, function(err, collegeLists) {
		res.render('colleges', { title: 'Colleges', list: collegeLists });
	});
};