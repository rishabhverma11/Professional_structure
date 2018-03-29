var commfunc = require('../modules/commonFunction');
var responses = require('../modules/responses');
var UserModal = require('../modals/user');
var md5 = require("md5");

/* Controller for user login */ 
exports.login = function(req, res) {
	var { email, password } = req.body;
console.log(email,password)
	var manValues = [email, password];
	var checkBlank = commfunc.checkBlank(manValues);
	if (checkBlank == 1) {
		responses.parameterMissing(res);
	} else {
		UserModal.checkLoginEmail(email, password ,function(result){
			if (result == 0) {
				responses.sendError(res);
			} else if ( result == 2 ) {
				console.log("emailNotFound");
			} else {
				console.log("coming");
				console.log(result);
				var encry_hash = md5(password);
				console.log(result[0].password)
				if (result[0].password != encry_hash) {
					console.log("Invalid password");
				} else {

					var access_token = md5(new Date());
					var data = {access_token: access_token};
					var condition = {user_id: result[0].user_id};

					UserModal.updateUserData(data, condition, function(updatedResult){
						if (updatedResult == 0) {
							responses.sendError(res);
						} else {
							if (updatedResult == 1){
								UserModal.sendEmaillogin(email ,function(result){
									if(result == 1){
										responses.sendError(res);
									} else {
										UserModal.showalldata(email ,function(result){
											if (result == 1){
												responses.sendError(res);
											} else {
												console.log(result[0]);
						
												responses.success(res, result[0]);
											}
										});

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
/*Controller for user Create Profile */
exports.createprofile = function(req, res){
	var{ gender, aboutme, access_token} = req.body;
	var manValues = [ gender, aboutme];
	console.log(manValues);
	var checkBlank=commfunc.checkBlank(manValues);
	if(checkBlank == 1){
		responses.sendError(res);
	} else{
		var profile_image = "";
		var cover_image = "";
		for(i=0;i<req.files.length;i++) {
			if(req.files[i].fieldname == "profile_image"){
				profile_image=req.files[i].filename; 
			} else if(req.files[i].fieldname == "cover_image") {
				cover_image=req.files[i].filename;
			}
			console.log(profile_image);
		}
		var data={ gender:gender, aboutme:aboutme, profile_image:profile_image, cover_image:cover_image};
		var condition={access_token:access_token};
		UserModal.updateUserData(data, condition , function(updatedResult){
			if(updatedResult = 0){
				responses.sendError(res);
			}else {
				UserModal.showalldata(access_token ,function(result){
					console.log(result);
					if (result == 1){
						responses.sendError(res);
					} else {

						responses.success(res, result[0]);
					}
				});
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
					if(result == 0) {
						responses.sendError(res)
					} else {
						UserModal.sendEmailsignup(email ,function(result){
							if(result == 1){
								responses.sendError(res);
							} else {
								UserModal.showalldata(email ,function(res, result){
									if (result == 1){
										responses.sendError(res);
									} else {
										responses.success(res, result[0]);
									}
								});

							}

						});
					}
				});
			}
		});
	}
								
}