
/*
 * GET home page.
 */
 
exports.indexes = function(req, res) {
	res.render('index', {title: 'Welcome'});
}

exports.file_upload = function(req, res) {
	res.render('upload', {title: 'Upload data file', filetype:'data', location:'/upload/file-uploaded'});
};

exports.description_upload = function(req, res) {
	res.render('upload', {title: 'Upload description file', filetype:'description', location: '/upload/description-uploaded'});
};

exports.frequency_upload = function(req, res) {
	res.render('upload', {title: 'Upload frequency file', filetype:'frequency', location: '/upload/frequency-uploaded'});
};

exports.colleges = function(req, res){
	var dburl = 'localhost:27017/IPEDS_Documentation';
	var collections = ['institutions'];

	var db = require('mongojs').connect(dburl, collections);
	
	db.institutions.find().sort({'INSTNM':1}, function(err, collegeLists) {
		res.render('colleges', { title: 'Colleges', list: collegeLists });
	});
};