const Plano = require('./../../model/plano');
const PagamentoRecorrencia = require('../../service/PagamentoRecorrencia');
const Assinatura = require('../../service/Assinatura');

module.exports = async (req, res) => {
    const pagamento = new PagamentoRecorrencia();

    // pagamento.obtemIdTemporarioLancamento(data);
    // pagamento.criarAssinatura(dataAssinatura);
    // pagamento.obtemAssinatura(516673);
    // pagamento.cancelarAssinatura(516673);
    // pagamento.verificaCartao(dadosCartao);
    // pagamento.geraPlano();
    console.log('Erros validacao: ', req.erros_validacao);
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
            // await servicoAssinatura.criarAssinaturaProfessional(1, dadosFormulario);
            const data = await servicoAssinatura.trocarCartaoAssinatura(519358, dadosFormulario);
            console.log('sdfs', data)
        }
    } catch(erro) {
        console.log(erro);
    }
    

    return res.render('pagamento/pagamento', { errosValidacao, inputParams });
};