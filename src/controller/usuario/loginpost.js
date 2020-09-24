module.exports = (req, res) => {
    
    const inputParams = req.body;
    const errosValidacao = (req.erros_validacao)? req.erros_validacao : null;

    return res.render('usuario/login', { errosValidacao });
    
};