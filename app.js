global.rekuire = require('rekuire');

var express = require('express'),
   fs = require('fs'),
   routes = require('./routes'),
   user = require('./routes/user'),
   upload = require('./routes/upload'),
   add = require('./routes/add'),
   chart = require('./routes/chart'),
   models = ('./models');
   http = require('http'),
   path = require('path'),
   myPromise = require('mpromise');
	
   
var app = express();


app.configure(function () {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser({uploadDir: './incoming'}));
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
	app.use(express.errorHandler());
});

// These three lines connect to the mongodb database to get the collections 'sample' that has the universities
app.get('/colleges', routes.colleges); //This shows the list of all the universities in the csv file
app.get('/colleges/:id', user.list); //This give the user.js the address to show a specific university's info


app.get('/',routes.indexes); // Welcome page

app.get('/choose',routes.choose_upload);// Choose type of upload
app.get('/choose/fileupload',routes.file_upload); // Upload a data file
app.post('/choose/upload/file-uploaded', upload.file_success); //Data file was loaded successfully

app.get('/choose/descriptionupload',routes.description_upload); // Upload a description file
app.post('/choose/upload/description-uploaded', upload.description_success); // Description file successfully uploaded

app.get('/choose/frequencyupload',routes.frequency_upload); // Upload a frequency file
app.post('/choose/upload/frequency-uploaded', upload.frequency_success); // Frequency file uploaded successfully

app.get('/choose/additionaluploads',add.additionalfiles);

app.post('/choose/upload/enrollment-uploaded', add.enrollment_success);
app.post('/choose/upload/tuition-uploaded', add.tuition_success);

app.get('/chart', chart.bargraph);
app.get('/chart/:sid', chart.viewInfo);
app.get('/testPage', chart.tests);

http.createServer(app).listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));

});
