
var users = require('./../controllers/users.js');
var buckets = require('./../controllers/bucketlists.js')
module.exports = function(app) {
	app.post('/login', users.login)
	app.post('/users', users.register)
	app.post('/addingbuckets', buckets.addbucket)
	app.get('/getbuckets', buckets.getBuckets)
	app.get('/getusers', users.getusers)
	app.get('/user/:id/', users.show)
	app.use(userAuth); //middleware
	app.get('/currentUser', users.getCurrent)
	app.post('/logout', users.logout)
};

//userAuth middleware
function userAuth(req,res,next){
	if (req.session.user){
		next();
	}else{
		res.sendStatus(401);
	}
}
