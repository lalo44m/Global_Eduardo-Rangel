var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IOTSchema = new Schema({
    Humedad:{type:Number},
	TemperaturaC:{type:Number},
    TemperaturaF:{type:Number},
    Indice_calor:{type:Number},
});



module.exports = mongoose.model('IOT', IOTSchema);