var LocalStrategy   = require('passport-local').Strategy;
var UsuarioModel = require('../../model/usuario');
var criptotagrafia = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('sessao-autenticacao', new LocalStrategy({
            passReqToCallback : true,
            usernameField: 'email',
            passwordField: 'senha'
        },
        async function(req, username, password, done) { 

            try {
                const usuario = await UsuarioModel.findOne({ where: { email: username} } );

                if (!usuario){

                    return done(null, false);

                }

                if (!isValidPassword(usuario, password)){

                    return done(null, false); 

                }
               
                const sessao = {
                    id: usuario.id,
                    email: usuario.email,
                    status: usuario.status
                }
                
                return done(null, sessao);

            } catch (erro) {

                return done(erro);

            }
           

        })
    );


    var isValidPassword = function(usuario, senha){

        return criptotagrafia.compareSync(senha, usuario.senha);

    }
    
}