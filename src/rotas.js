var isAuthenticated = function (req, res, next) {
	
	if (req.isAuthenticated()) {
		
		return next();

	}
		

	res.redirect('/login');
};

module.exports = (app, passport) => {
	app.use('/', require('./controller/home/index'));
	app.use('/login', require('./controller/usuario/loginget') );
    app.use('/', require('./controller/usuario/index')(passport) );
    app.use('/pagamento', isAuthenticated, require('./controller/pagamento/index'));
	app.use('/perfil', isAuthenticated, require('./controller/perfil/perfilget'));
	app.use('/', isAuthenticated, require('./controller/perfil/index'));


	app.post('/cadastro', passport.authenticate('sessao-cadastro', {
		successRedirect: '/pagamento/pro',
		failureRedirect: '/test',
		failureFlash : true  
	}));


};