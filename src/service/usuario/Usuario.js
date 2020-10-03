const usuarioModel = require('./../../model/usuario');
const Assinatura = require('./../Assinatura');
const criptografia = require('bcrypt-nodejs');

class Usuario {

    async cadastroUsuario(dadosUsuario) {
        try {
            novoUsuario.senha = criptografia.hashSync(dadosUsuario.senha, criptografia.genSaltSync(10), null);
            const novoUsuario =  await usuarioModel.create(dadosUsuario);

            if (novoUsuario) {
                const assinatura = new Assinatura();
                assinatura.criarAssinaturaFree(novoUsuario.id);

                return true;

            }

        } catch (erro){
            console.log(erro);

            return false;

        }
        
    }

    async alterarUsuario(id, dadosUsuario) {
        try {
            
            const usuarioTransacao = await Sequelize.transaction(async (t) => {

                const usuario = await UsuarioModel.findOne({
                    where: {id: id}
                }, { transaction: t });

                if(!usuario) {
                    throw new Error('usuário nao encontrado.');
                }
        
                const sucesso = await UsuarioModel.update(
                    dadosUsuario,
                    {
                        where: {id: id}
                    }, 
                    { transaction: t });
        
                return sucesso;

            });

            return usuarioTransacao;


        } catch (error) {

            return false;
        
        }
    }

    async buscaUsuarioPorEamil(email) {
        try {
            
            const usuario = await UsuarioModel.findOne({
                    where: {email: email}
                }
            );

            if(!usuario) {
                
                return false;

            }
    
            return usuario;


        } catch (error) {

            return false;
        
        }
    }
}

module.exports = Usuario;
