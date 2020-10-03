var LocalStrategy   = require('passport-local').Strategy;
var UsuarioModel = require('../../model/usuario');
var criptografia = require('bcrypt-nodejs');
const Assinatura = require('./../Assinatura');

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
                        const dadosNovoUsuario = { 
                            email: req.body.email, 
                            senha: createHash( req.body.senha),
                            grupo: 'usuario'
                        }
                        const novoUsuario = await UsuarioModel.create(dadosNovoUsuario);

                        if(novoUsuario) {
                            const assinatura = new Assinatura();
                            await assinatura.criarAssinaturaFree(novoUsuario.id);
                        }
    
                        const sessao = {
                            id: novoUsuario.id,
                            email: novoUsuario.email,
                            status: novoUsuario.status
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
        return criptografia.hashSync(password, criptografia.genSaltSync(10), null);
    }

}