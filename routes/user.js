
/*
 * GET users listing.
 */

exports.list = function(req, res){
	var db = monk('localhost:27017/exampleDb');
	var collection = db.get('sample');
	collection.find({}, {}, function (e, docs) {
		res.render('userlist', {
			"userlist": docs
    });
});
};