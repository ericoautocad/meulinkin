module.exports = (req, res) => {
    
    console.log('Erros validacao: ', req.erros_validacao);
    const errosValidacao = (req.erros_validacao)? req.erros_validacao : null;
    const inputParams = req.body;

    return res.render('usuario/cadastro')
    // return res.render('pagamento/pagamento', { errosValidacao, inputParams });
};