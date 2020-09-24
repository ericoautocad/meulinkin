const validaAutenticacao = require('./validation/usuario/ValidaAutenticacao');

module.exports = (app, passport) => {

	app.use('/', require('./controller/usuario/index')(passport) );
	app.use('/login', require('./controller/usuario/loginget') );
    app.use('/', require('./controller/home/index') );
	app.use('/pagamento', validaAutenticacao, require('./controller/pagamento/index') );
	app.use('/perfil', validaAutenticacao, require('./controller/perfil/index') );

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