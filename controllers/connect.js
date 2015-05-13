module.exports = {
	iConnect: function () {
		var dburl = 'localhost:27017/IPEDS_Documentation';
		var collections = ['institutions'];
		var db = require('mongojs').connect(dburl, collections);

		return db.institutions;
	},
	
	dConnect: function () {
		var dburl = 'localhost:27017/IPEDS_Documentation';
		var collections = ['descrips'];
		var db = require('mongojs').connect(dburl, collections);

		return db.descrips;
	},
	
	fConnect: function () {
		var dburl = 'localhost:27017/IPEDS_Documentation';
		var collections = ['frequencies'];
		var db = require('mongojs').connect(dburl, collections);

		return db.frequencies;
	}
	
};

