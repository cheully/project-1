var mongoose = require('mongoose');
var db = rekuire('db');

var institutionSchema = new mongoose.Schema({
	"UNITID":String,
	"INSTNM":String,
	"ADDR":String,
	"CITY":String,
	"STABBR":String,
	"ZIP":String,
	"FIPS":String,
	"OBEREG":String,
	"CHFNM":String,
	"CHFTITLE":String,
	"GENTELE":String,
	"FAXTELE":String,
	"EIN":String,
	"OPEID":String,
	"OPEFLAG":String,
	"WEBADDR":String,
	"ADMINURL":String,
	"FAIDURL":String,
	"APPLURL":String,
	"NPRICURL":String,
	"SECTOR":String,
	"ICLEVEL":String,
	"CONTROL":String,
	"HLOFFER":String,
	"UGOFFER":String,
	"GROFFER":String,
	"HDEGOFR1":String,
	"DEGGRANT":String,
	"HBCU":String,
	"HOSPITAL":String,
	"MEDICAL":String,
	"TRIBAL":String,
	"LOCALE":String,
	"OPENPUBL":String,
	"ACT":String,
	"NEWID":String,
	"DEATHYR":String,
	"CLOSEDAT":String,
	"CYACTIVE":String,
	"POSTSEC":String,
	"PSEFLAG":String,
	"PSET4FLG":String,
	"RPTMTH":String,
	"IALIAS":String,
	"INSTCAT":String,
	"CCBASIC":String,
	"CCIPUG":String,
	"CCIPGRAD":String,
	"CCUGPROF":String,
	"CCENRPRF":String,
	"CCSIZSET":String,
	"CARNEGIE":String,
	"LANDGRNT":String,
	"INSTSIZE":String,
	"CBSA":String,
	"CBSATYPE":String,
	"CSA":String,
	"NECTA":String,
	"F1SYSTYP":String,
	"F1SYSNAM":String,
	"F1SYSCOD":String,
	"COUNTYCD":String,
	"COUNTYNM":String,
	"CNGDSTCD":String,
	"LONGITUD":String,
	"LATITUDE":String
}, {strict:false});

var descriptionSchema = new mongoose.Schema({
	"varnumber":String,
	"varname":String,
	"DataType":String,
	"Fieldwidth":String,
	"format":String,
	"varTitle":String
}, {strict:false});

var frequencySchema = new mongoose.Schema({
	"varnumber":String,
	"varname":String,
	"codevalue":String,
	"valuelabel":String,
	"frequency":String,
	"percent":String
}, {strict:false});


var institutions = db.model('institutions', institutionSchema);
var description = db.model('descrips', descriptionSchema);
var frequency = db.model('frequencies', frequencySchema);


module.exports = exports = {
  Institution: institutions,
  Description: description,
  Frequency: frequency
}

