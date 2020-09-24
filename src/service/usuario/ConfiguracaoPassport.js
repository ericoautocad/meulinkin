var sessaoAutenticacao = require('./SessaoAutenticacao');
var sessaoCadastro = require('./SessaoCadastro');
var UsuarioModel = require('../../model/usuario');

module.exports = function(passport){

    passport.serializeUser(function(usuario, done) {
        done(null, usuario.id);
    });

    passport.deserializeUser( async function(id, done) {
        
        try{
            const usuario = await UsuarioModel.findOne({ where: { id: id} } );
            const sessao = {
            id: usuario.id,
            email: usuario.email
            }
            done(null, sessao);
        } catch(erro){
            done(erro, false); 
        }
        
    });

    sessaoAutenticacao(passport);
    sessaoCadastro(passport);

}