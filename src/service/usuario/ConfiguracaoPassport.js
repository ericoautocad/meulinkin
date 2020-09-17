var sessaoAutenticacao = require('./SessaoAutenticacao');
var sessaoCadastro = require('./SessaoCadastro');
var UsuarioModel = require('../../model/usuario');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(usuario, done) {
        console.log('serializing user: ');console.log(usuario);
        done(null, usuario.id);
    });

    passport.deserializeUser( async function(id, done) {
        const usuario = await UsuarioModel.findOne({ where: { id: id} } );
        console.log('deserializing user:',usuario);
        done(usuario);
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    sessaoAutenticacao(passport);
    sessaoCadastro(passport);

}