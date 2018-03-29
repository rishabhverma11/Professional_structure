var connection = require('../modules/connection');
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
//var config = require("./config.json");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var md5 = require("md5");

exports.checkLoginEmail = function (email, password, callback) {
	var sql = "SELECT * FROM `user` WHERE `email`=? AND password =?";
	console.log(email,password)

	connection.query(sql, [email, md5(password)], function(err, result){ 
		if (err) {

			callback(0);
		} else {
			console.log(result)
			 result.length > 0 ? callback(result) : callback(2);
			//if ( result.length > 0 ) { callback(result); } else { callback(2); }
		}
	});
}
exports.sendEmaillogin = function(email, callback){
	var config={"SMTP_HOST": "smtp.sendgrid.net",
    "SMTP_PORT": 25,
    "SMTP_USER": "apikey",
    "SMTP_PASS": "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"}
	console.log(email);
	var mailer = nodemailer.createTransport(smtpTransport({
	    host: config.SMTP_HOST,
	    port: config.SMTP_PORT,
	    auth: {
	        user: config.SMTP_USER,
	        pass: config.SMTP_PASS
	    }
	}));
	mailer.sendMail({
	    from: "CEO@vermaindustries.in",
	    to: email,
	    subject: " You just Login in ",
	    template: "text",
	    html: "WELCOME TO VERMA INDUSTRIES , HOPE FOR THE GOOD BUSSINESS AHEAD"
	}, (error, response) => {
	    if (error) {
	    	callback (1);
	        console.log(error);
	        console.log( "Email not send successfully");
	    } else {
	    	callback(2);
	        console.log( "Email send successfully" );
	    }
	    mailer.close();
	});
}
exports.sendEmailsignup = function(email, callback){
	var config={"SMTP_HOST": "smtp.sendgrid.net",
    "SMTP_PORT": 25,
    "SMTP_USER": "apikey",
    "SMTP_PASS": "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"}
	console.log(email);
	var mailer = nodemailer.createTransport(smtpTransport({
	    host: config.SMTP_HOST,
	    port: config.SMTP_PORT,
	    auth: {
	        user: config.SMTP_USER,
	        pass: config.SMTP_PASS
	    }
	}));
	mailer.sendMail({
	    from: "CEO@vermaindustries.in",
	    to: email,
	    subject: " WELCOME ",
	    template: "text",
	    html: "WELCOME TO VERMA INDUSTRIES , HOPE FOR THE GOOD BUSSINESS AHEAD"
	}, (error, response) => {
	    if (error) {
	    	callback (1);
	        console.log(error);
	        console.log( "Email not send successfully");
	    } else {
	    	callback(2);
	        console.log( "Email send successfully" );
	    }
	    mailer.close();
	});
}
exports.checkSignUpEmail =function(email , callback){
	var sql = "SELECT * FROM `user` WHERE `email`=?";
	connection.query(sql, [email],function(err ,result){
		console.log(result);
		if(err){
			callback(0);
		} else if(result.length > 0){
			callback(1)
		}
		else{
			callback(2);
		}
	});
}
exports.insertdata = function(data, callback){
	console.log(data);
	var sql = "INSERT INTO `user`(`user_id`, `access_token`, `name`, `email`, `password`,`device_type`, `device_token`, `latitude`, `longitude`) VALUES(?)";
	//var values = [user_id, access_token, name, email, md5(password)];
    connection.query(sql, [data], function(err){
    	console.log(1234);
	    if ( err ) {
	       callback(0);
	    } else {
	    	callback(1);
	    }
	});
}
exports.updateUserData = function(data, condition, callback) {
	console.log(data);
	var sql = "UPDATE `user` SET ? WHERE ?";
	connection.query(sql, [data, condition], function(err, result){
		console.log(err);
		err ? callback(0) : callback(1);
	});
}
exports.showalldata1 = function(access_token, callback) {
	var sql = "SELECT * from `user` WHERE `access_token`= ?";
	connection.query(sql, [access_token], function(err, result){
		if(err){
			callback(0);
		} else {
			callback(result);
		}
	});
}
exports.showalldata = function(email, callback) {
	var sql = "SELECT * from `user` WHERE `email`= ?";
	connection.query(sql, [email], function(err, result){
		if(err){
			callback(0);
		} else {
			callback(result[0]);
		}
	});
}