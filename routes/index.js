
/*
 * Pages for home, uploads and college lists
 */

// Home page 
exports.indexes = function(req, res) {

	res.render('index', {title: 'Welcome'});
};

// Data file upload page
exports.file_upload = function(req, res) {
	res.render('upload', {title: 'Upload data file', filetype:'data', location:'/upload/file-uploaded'});
};

// Description file upload page
exports.description_upload = function(req, res) {
	res.render('upload', {title: 'Upload description file', filetype:'description', location: '/upload/description-uploaded'});
};

// Frequency file upload page
exports.frequency_upload = function(req, res) {
	res.render('upload', {title: 'Upload frequency file', filetype:'frequency', location: '/upload/frequency-uploaded'});
};

//College List page
exports.colleges = function(req, res){
	
	// Connect to the mongodb to the specified document
	var dburl = 'localhost:27017/IPEDS_Documentation';
	var collections = ['institutions'];
	var db = require('mongojs').connect(dburl, collections);
	
	// Get all the institutions and sort them alphabetically
	db.institutions.find().sort({'INSTNM':1}, function(err, collegeLists) {
		res.render('colleges', { title: 'Colleges', list: collegeLists });
	});
};