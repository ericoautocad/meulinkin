const usuarioModel = require('./../../model/usuario');
const Assinatura = require('./../Assinatura');
const criptografia = require('bcrypt-nodejs');

class CadastroInicial {

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
}

module.exports = CadastroInicial;
