
/*
 * GET home page.
 */
 
  // These three lines connect to the mongodb database to get the collections 'sample' that has the universities
var dburl = 'localhost:27017/exampleDb';
var collections = ['sample'];

var db = require('mongojs').connect(dburl, collections);

exports.index = function(req, res){
	db.sample.find().sort({'INSTNM':1}, function(err, index) {
		res.render('index', { title: 'Colleges', list: index });
	});
};

	  