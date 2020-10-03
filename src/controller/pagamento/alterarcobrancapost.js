
const Assinatura = require('../../service/Assinatura');

module.exports = async (req, res) => {
    const inputParams = req.body;
    const errosValidacao = (req.erros_validacao)? req.erros_validacao : null;
    
    try{
        if(!errosValidacao) {
            const dadosFormulario = inputParams;
            dadosFormulario.customer = {
                email: 'erico.autocad@gmail.com',
                document_number: '08513308609'
            };
            const servico = new Assinatura();
            const assinatura = await servico.buscarDadosAssinatura(req.user.id);
            if(assinatura.assinatura_pagamento_id){
                const recorrencia = await servico.trocarCartaoAssinatura(assinatura.assinatura_pagamento_id, dadosFormulario);
                if(recorrencia) {
                    
                    return res.redirect('/conta/pessoal');

                }
            }
            
        }
    } catch(erro) {
        console.log(erro);
    }
    

    return res.render('pagamento/cobranca', { errosValidacao, inputParams });
};