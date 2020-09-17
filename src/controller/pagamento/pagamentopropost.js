const Plano = require('./../../model/plano');
const PagamentoRecorrencia = require('../../service/PagamentoRecorrencia');
const Assinatura = require('../../service/Assinatura');

module.exports = async (req, res) => {
    const pagamento = new PagamentoRecorrencia();
    // let data = {
    //     card_number: '5502095493429791',
    //     card_holder_name: 'ERICO O LEANDRO',
    //     card_expiration_date: '1224',
    //     card_cvv: '405',
    // };
    
    // card_cke99lwur2d8kga65phrmkg24
    // 3059871_ZvAMdlkMJpb1R0Q9j01kbqO//hOvPFwrnioCEMUOybqwYIGt85GX2Gv+A7Pngx//iZJz+umKyumaJrnfrK8xdYx1JUARtMIODvT7Y66u0gOuP72z99s6A9Y7L8XYRCJpv/HzZDQbGNMx0jhv1lxzhYI8GSypjz3DuduZ3x11QuBwujpPpzamFX+T+wJh/43p9DMnr/qYdhwf3IU36u6mTx8GDrSmczp3NwANl6kVE2rs5jEwtZ0nEedq8aWz9FGZbut1lCw9+9RGw1h1oNUo6cxhzVf35/k+oKag3lMON9kF5EjIFcSK9ALxumNHBrmmZASn0NCRi+O/+ZTnd7OuSg==

    // let dataAssinatura = {
    //     card_number: '5502095493429791',
    //     card_holder_name: 'ERICO O LEANDRO',
    //     card_expiration_date: '1224',
    //     card_cvv: '405',
    // };
    
    // let dataAssinatura = {
    //     plan_id: 1046349,
    //     card_id: 'card_cke99lwur2d8kga65phrmkg24',
    //     payment_method:'credit_card',
    //     customer: {
    //     email: 'erico.autocad@gmail.com',
    //     name: 'Érico de Oliveira',
    //     document_number: '08513308609',
    //     address: {
    //         zipcode: '33820080',
    //         neighborhood: 'Veneza',
    //         street: 'Rua Maria Adelaide',
    //         street_number: '1312'
    //     },
    //     phone: {
    //         number: '992444070',
    //         ddd: '31'
    //         }
    //     }
    // };

    let dataAssinatura = {
        plan_id: 499677,
        card_number: '5502095493429791',
        card_holder_name: 'ERICO O LEANDRO',
        card_expiration_date: '1224',
        card_cvv: '405',
        customer: {
        email: 'erico.autocad@gmail.com',
        document_number: '08513308609'
        }
    };

    let dadosCartao = {
        plan_id: 499677,
        card_number: '5502095493429791',
        card_holder_name: 'ERICO O LEANDRO',
        card_expiration_date: '1224',
        card_cvv: '405'
    };

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
            // const data = await servicoAssinatura.trocarCartaoAssinatura(519358, dadosFormulario);
            const data = servicoAssinatura.cancelarAssinatura(1);
            
            console.log('teste', data)
        }
    } catch(erro) {
        console.log(erro);
    }
    

    return res.render('pagamento/pagamento', { errosValidacao, inputParams });
};