var isAuthenticated = function (req, res, next) {
	
	if (req.isAuthenticated()) {
		
		return next();

	}
		

	res.redirect('/login');
};

module.exports = (app, passport) => {
    // app.use('/', require('./controller/home/index'));
    app.use('/', require('./controller/usuario/index')(passport) );
    app.use('/pagamento', isAuthenticated, require('./controller/pagamento/index'));
    app.use('/perfil', isAuthenticated, (req, res) => {
		return res.render('perfil/perfil')
	});

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