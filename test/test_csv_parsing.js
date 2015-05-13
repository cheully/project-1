var assert = require('assert');
var rekuire = require('rekuire');

describe('CSV-Parser', function() {
	var upload = rekuire('fileUpload.js');
	var dir = './test/hd2013-p1.csv';
		
	var records = upload.csvParser(dir);
	
	it('should return an array of objects', function () {
		assert(Array.isArray(records), "The returned value is an array");
	})
	
	it('returned array is not empty', function() {
		assert(records.length != 0, "The returned value is not empty!");
	})
});

describe('Institution Information', function() {
	var c = rekuire('connect.js'),
		db = c.iConnect();
		
	it('should return an array of objects', function () {
		db.find(function (err, arr) {
			assert(Array.isArray(arr), "The value is an object");
		});
	})
	
	it('should produce an error if an institution does not exist', function () {
		db.find({"UNITID":'112233'}, function(err, doc) {
			assert(doc === [], "An error occurred");
		});
	})

	it('all institutions should have a name', function () {
		db.find({"INSTNM":{$exists:true}}, function(err, doc) {
			assert(doc.length != 0, "They have a name");
		});
	
	})
});



