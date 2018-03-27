var commfunc = require('../modules/commonFunction');
var responses = require('../modules/responses');
var UserModal = require('../modals/user');
var md5 = require("md5");

/* Controller for user login */ 
exports.login = function(req, res) {
	var { email, password, device_type, device_token, latitude, longitude } = req.body;

	var manValues = [email, password, device_type, device_token, latitude, longitude];
	var checkBlank = commfunc.checkBlank(manValues);
	if (checkBlank == 1) {
		responses.parameterMissing(res);
	} else {
		UserModal.checkLoginEmail(email, function(result){
			if (result == 1) {
				responses.sendError(res);
			} else if ( result == 2 ) {
				console.log("emailNotFound");
			} else {
				var encry_hash = md5(password);
				if (result[0].password != encry_hash) {
					console.log("Invalid password");
				} else {

					var access_token = md5(new Date());
					var data = {access_token: access_token, device_type: device_type, device_token: device_token, latitude: latitude, longitude: longitude};
					var condition = {user_id: result[0].user_id};

					UserModal.updateUserData(data, condition, function(updatedResult){
						if (updatedResult == 0) {
							responses.sendError(res);
						} else {
							if (updatedResult == 1){
								UserModal.showalldata(email ,function(result){
									if (result == 1){
										responses.sendError(res);
									} else {
										responses.success(res, result[0]);
									}
								});
							}
						}
					});
				}
			}
		});
	}
}

exports.signup = function(req ,res) {
	var {name, email, password, device_type, latitude, longitude} = req.body;
	var manValues = [name, email, password, device_type, latitude, longitude]
	var checkBlank = commfunc.checkBlank(manValues);
	if(checkBlank == 1){
		responses.sendError(res);
	} else {
		UserModal.checkSignUpEmail(email, function(result){
			console.log(result);
			if(result == 0){
				responses.sendError(res);
			}  else if(result == 2){
				var access_token = md5(new Date());
				var user_id = md5(new Date());
				var device_token = md5(new Date());
				var data =[user_id, access_token, name, email, md5(password),device_type, device_token, latitude, longitude];
				UserModal.insertdata(data, function(result){
					console.log(result);
					console.log(234567);
					if(result == 0) {
						responses.sendError(res)
					} else {
						UserModal.showalldata(email ,function(result){
							console.log(result);
							if (result == 1){
								responses.sendError(res);
							} else {

								responses.success(res, result[0]);
							}
						});
					}

				});
			} else{
				responses.emailAlreadyExist(res);
			}
		});
	}	
}