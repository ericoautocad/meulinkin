const Plano = require('./../../model/plano');
const PagamentoRecorrencia = require('../../service/PagamentoRecorrencia');

module.exports = (req, res) => {
    const pagamento = new PagamentoRecorrencia();
    
    console.log('Erros validacao: ', req.erros_validacao);
    const errosValidacao = (req.erros_validacao)? req.erros_validacao : null;
    const inputParams = req.body;

    return res.render('pagamento/pagamento', { errosValidacao, inputParams });
};