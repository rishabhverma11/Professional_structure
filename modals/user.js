var connection = require('../modules/connection');

exports.checkLoginEmail = function (email, callback) {
	var sql = "SELECT * FROM `user` WHERE `email`=?";
	connection.query(sql, [email], function(err, result){ 
		if (err) {
			callback(0);
		} else {
			result.length > 0 ? callback(result) : callback(1);
			// if ( result.length > 0 ) { callback(result); } else { callback(2); }
		}
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
	var sql = "UPDATE `user` SET ? WHERE ?";
	connection.query(sql, [data, condition], function(err, result){
		console.log(err);
		err ? callback(0) : callback(1);
	});
}
exports.showalldata = function(email, callback) {
	var sql = "SELECT * from `user` WHERE `email`= ?";
	connection.query(sql, [email], function(err, result){
		if(err){
			callback(0);
		} else {
			callback(result);
		}
	});
}