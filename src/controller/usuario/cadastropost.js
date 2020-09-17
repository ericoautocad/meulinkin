const usuarioModel = require('./../../model/usuario')
module.exports = async function(req, res)
{

    const errosValidacao = (req.erros_validacao)? req.erros_validacao : null;

    if (errosValidacao) {

        return res.send(JSON.stringify(errosValidacao));
        
    } else {
        let dadosUsuario = req.body;
        console.log(dadosUsuario);
        await usuarioModel.create(dadosUsuario);

        return res.redirect('/perfil');

    }
    
};