var user = require('../controllers/user');
var multer = require('multer');
var md5 = require('md5');
var path = require('path');
exports.default = function(app) {

	// Routes for user login
	app.route('/user/login').post(user.login);

	// Routes for user login
	app.route('/user/signup').post(user.signup);

	//Routes for user createprofile
	
	var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        // console.log(file);
        callback(null, './uploads/user');
    },
    filename: function(req, file, callback) {
        // console.log(file);
        var fileUniqueName = md5(Date.now());
        callback(null,  fileUniqueName + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });
app.route('/user/createprofile').post(upload.any(),user.createprofile);


	return app;
}