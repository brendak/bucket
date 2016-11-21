// require express so that we can build an express app
var express = require('express');
// require path so that we can use path stuff like path.join
var path = require('path');
// instantiate the app
var app = express();
var bodyParser = require('body-parser'); 
var session = require('express-session');



var sessionConfig = {
	secret:'CookieMonster', // Secret name for decoding secret and such
	resave:false, // Don't resave session if no changes were made
	saveUninitialized: true, // Don't save session if there was nothing initialized
	name:'myCookie', // Sets a custom cookie name
	cookie: {
		secure: false, // This need to be true, but only on HTTPS
		httpOnly:false, // Forces cookies to only be used over http
		maxAge: 3600000
	}
}
// This goes in our server.js file so that we actually use the mongoose config file!
require('./server/config/mongoose.js');
// this line requires and runs the code from our routes.js file and passes it app so that we can attach our routing rules to our express application!
app.use(session(sessionConfig));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({extended:true}))

app.use(function(req,res,next){
	console.log(req.session);
	next();
})
app.use(express.static(path.join(__dirname, '/client')));
require('./server/config/routes.js')(app);



// set up a static file server that points to the "client" directory
app.listen(8000, function() {
  console.log('cool stuff on: 8000');
});