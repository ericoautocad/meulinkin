const CadastroInicial = require('./../../service/usuario/CadastroInicial');

module.exports = async function(req, res, next)
{

    const errosValidacao = (req.erros_validacao)? req.erros_validacao : null;

    if (errosValidacao) {

        return res.send(JSON.stringify(errosValidacao));
        
    } else {
        let dadosUsuario = req.body;
        const servico = new CadastroInicial();

        await servico.cadastroUsuario(dadosUsuario);

        return next();


    }
    
};