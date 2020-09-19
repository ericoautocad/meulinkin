var LocalStrategy   = require('passport-local').Strategy;
var UsuarioModel = require('../../model/usuario');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('sessao-cadastro', new LocalStrategy({
            passReqToCallback : true,
            usernameField: 'email',
            passwordField: 'senha'
        },
        function(req, username, password, done) {
            
            findOrCreateUser =  async function(){
                
                try{
                    const cadastrado = await UsuarioModel.findOne({ where: { email: username} } );
                    if(cadastrado) {
                        
                        return done(null, false, {mensagem: 'Usuário já cadastrado!'});
    
                    } else {
                        const dadosNovoUsuario = { email: req.body.email, senha: createHash( req.body.senha)}
                        const novoUsuario = await UsuarioModel.create(dadosNovoUsuario);
    
                        const sessao = {
                            id: novoUsuario.id,
                            email: novoUsuario.email
                        }

                        return done(null, sessao);
    
                    }
                        
                } catch(erro){
                    return done(erro);
                }

            };
            
            process.nextTick(findOrCreateUser);
            
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}