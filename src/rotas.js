var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
};

module.exports = (app, passport) => {
    // app.use('/', require('./controller/home/index'));
    app.use('/', require('./controller/usuario/index'));
    app.use('/pagamento', isAuthenticated, require('./controller/pagamento/index'));

    // /* Handle Login POST */
	// router.post('/login', passport.authenticate('login', {
	// 	successRedirect: '/home',
	// 	failureRedirect: '/',
	// 	failureFlash : true  
	// }));

	// /* GET Registration Page */
	// router.get('/signup', function(req, res){
	// 	res.render('register',{message: req.flash('message')});
	// });

	/* Handle Registration POST */
	app.post('/cadastro', passport.authenticate('sessao-cadastro', {
		successRedirect: '/pagamento/pro',
		failureRedirect: '/test',
		failureFlash : true  
	}));

	// /* GET Home Page */
	// router.get('/home', isAuthenticated, function(req, res){
	// 	res.render('home', { user: req.user });
	// });

	// /* Handle Logout */
	// router.get('/signout', function(req, res) {
	// 	req.logout();
	// 	res.redirect('/');
	// });
};