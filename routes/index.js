/*
 * GET home page.
 */

//get correct directory path
var filePath = __dirname.replace('routes', 'views/')

exports.index = function(req, res) {
	res.render(filePath + 'index.ejs', {env: process.env.NODE_ENV || 'development'});
};

exports.partials = function (req, res) {
 	var name = req.params.name;
	res.sendFile(filePath + '/views/partials/' + name + '.html');
	console.log(filePath);
};
