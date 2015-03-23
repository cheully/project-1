
/*
 * GET users listing.
 */
 
 // These three lines connect to the mongodb database to get the collections 'sample' that has the universities
var dburl = 'localhost:27017/exampleDb';
var collection1 = ['sample'];

var db = require('mongojs').connect(dburl, collection1);


exports.list = function(req, res){
	//This finds the university with the id and render the schoollist view with the title and the list with information
	db.sample.find({'UNITID': req.params.id}, function(err, schoolInfo) {
		res.render('schoollist', { title: 'Info', list : schoolInfo });
  });
};
