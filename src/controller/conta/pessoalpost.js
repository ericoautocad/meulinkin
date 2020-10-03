const Usuario = require('./../../service/usuario/Usuario')

module.exports = (req, res) => {
    
    const inputParams = req.body;
    const errosValidacao = (req.erros_validacao) ? req.erros_validacao : null;

    if(errosValidacao) {
        res.json(errosValidacao).status(400);
    } else {
        const servico = new Usuario();
        servico.alterarUsuario(req.user.id, inputParams);
        res.redirect('/conta/pessoal');
    }

    

};