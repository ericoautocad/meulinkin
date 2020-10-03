const Plano = require('./../../model/plano');
const PagamentoRecorrencia = require('../../service/PagamentoRecorrencia');
const Assinatura = require('../../service/Assinatura');

module.exports = async (req, res) => {
    const pagamento = new PagamentoRecorrencia();
    const inputParams = req.body;
    const errosValidacao = (req.erros_validacao)? req.erros_validacao : null;
    
    try{
        if(!errosValidacao) {
            const dadosFormulario = inputParams;
            dadosFormulario.customer = {
                email: 'erico.autocad@gmail.com',
                document_number: '08513308609'
            };
            // const data = await pagamento.criarAssinatura(dadosFormulario);
            // pagamento.cancelarAssinatura(519356);
            const servicoAssinatura = new Assinatura();
            const recorrencia = await servicoAssinatura.criarAssinaturaProfessional(req.user.id, dadosFormulario);
            if (recorrencia) {
                res.redirect('/conta/pessoal');
            }
            // const data = await servicoAssinatura.trocarCartaoAssinatura(519358, dadosFormulario);
            // const data = servicoAssinatura.cancelarAssinatura(1);
            
        }
    } catch(erro) {
        console.log(erro);
    }
    

    return res.render('pagamento/pagamento', { errosValidacao, inputParams });
};