var path = require('path');
var winston = require('winston');
var _this = this;

var transports = [];

transports.push(new (winston.transports.Console)());
transports.push(new winston.transports.DailyRotateFile({
    name: 'file#info',
    level: 'info',
    filename: path.join(__dirname, '../logs/main.log'),
    datePattern: '.MM-dd-yyyy'
}));


var logger = new winston.Logger({ transports: transports });

module.exports = logger;

//
// /**
// * @desc Generate datetime string in mm/dd/yyy hh:mm:ss
// */
// exports.dateTimeString = function(){
// 	var date = new Date();
//     var month = date.getMonth() + 1;
//     var dateString =  month + '/' + date.getDate() + '/' + date.getFullYear()
// 						+ ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
//     return dateString ;
// }
//
// /**
// * @desc  Generate datetime string in yyyy-mm-ddThh:mm:ss
// * @param date consist given date
// */
// exports.shopifyDateString = function(date){
//     var month = date.getMonth() + 1;
//     var dateString =  date.getFullYear() + '-' + month + '-' + date.getDate() + 'T' +
// 						date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
//     return dateString ;
// }
//
// /**
// * @desc  Exporting Logger function
// */
// exports.logger = function(){
// 		return new (winston.Logger)({
// 		transports: [
// 		new (winston.transports.Console)(),
// 		new (winston.transports.File)(
// 			{
// 				filename: path.join(__dirname, '../../logs/main.log'),
// 				timestamp: function(){
// 					return _this.dateTimeString();
// 			} ,
// 				json: false ,
// 				maxsize: '100000'
// 			})
// 		]
// 	});
// }
