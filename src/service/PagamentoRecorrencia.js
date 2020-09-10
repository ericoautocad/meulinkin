const pagarme = require('pagarme')
const API_KEY = 'ak_test_BuZnffPZ3fUbhyeFEzQOqp4cSSxm9z';
const ID_PLANO_PROFISSIONAL = 499677;

class PagamentoRecorrencia {

    constructor() {
        
    }

    obtemIdPermanenteLancamento(data) {
        pagarme.client.connect({ api_key: API_KEY })
        .then(client => client.cards.create({
            card_number: data.card_number,
            card_holder_name: data.card_holder_name,
            card_expiration_date: data.card_expiration_date,
            card_cvv: data.card_cvv,
        })
        )
        .then(card => console.log('id_cartao: ' + card.id));
    }

    obtemIdTemporarioLancamento(data) {
        pagarme.client.connect({ encryption_key: API_KEY })
        .then(client => {
            return client.security.encrypt({
            card_number: data.card_number,
            card_holder_name: data.card_holder_name,
            card_expiration_date: data.card_expiration_date,
            card_cvv: data.card_cvv,
            });
        })
        .then(card_hash => console.log('id_cartao: ' + card_hash))
    }

    async criarAssinatura(dataAssinatura) {
        const conexao = await pagarme.client.connect({ api_key: API_KEY });
        const operacao = await conexao.subscriptions.create({
            plan_id: ID_PLANO_PROFISSIONAL,
            card_number: dataAssinatura.card_number,
            card_holder_name: dataAssinatura.card_holder_name,
            card_expiration_date: dataAssinatura.card_expiration_date,
            card_cvv: dataAssinatura.card_cvv,
            customer: {
                email: dataAssinatura.customer.email,
                document_number: dataAssinatura.customer.document_number
            }
            });
        
        return operacao;

    }

    async atualizarAssinatura(idAssinatura, dataAssinatura) {
        const conexao = await pagarme.client.connect({ api_key: API_KEY });
        const operacao = await conexao.subscriptions.update({
            id: idAssinatura,
            plan_id: ID_PLANO_PROFISSIONAL,
            card_number: dataAssinatura.card_number,
            card_holder_name: dataAssinatura.card_holder_name,
            card_expiration_date: dataAssinatura.card_expiration_date,
            card_cvv: dataAssinatura.card_cvv,
            payment_method: 'credit_card',
            customer: {
                email: dataAssinatura.customer.email,
                document_number: dataAssinatura.customer.document_number
            }
            });
        
        return operacao;

    }

    async cancelarAssinatura(idAssinatura) {
        const conexao = await pagarme.client.connect({ api_key: API_KEY });
        const operacao = await conexao.subscriptions.cancel({ id: idAssinatura });
        
        return operacao;
    }

    obtemTransacoesAssinatura(idAssinatura) {
        pagarme.client.connect({ api_key: API_KEY })
        .then(client => client.subscriptions.findTransactions({ id: idAssinatura }))
        .then(subscription => console.log(subscription))
    }

    obtemAssinatura(idAssinatura) {
        pagarme.client.connect({ api_key: API_KEY })
        .then(client => client.subscriptions.find({ id: idAssinatura }))
        .then(subscription => console.log(subscription))
    }

    verificaCartao(dadosCartao) {
        // pagarme.client.connect({ api_key: API_KEY })
        // pega os erros de validação nos campos do form e a bandeira do cartão
        var cardValidations = pagarme.validate({card: dadosCartao})
        console.log(cardValidations);
        
        return cardValidations;
    }

    geraPlano() {
        pagarme.client.connect({ api_key: API_KEY })
        .then(client => client.plans.create({
            amount: 400,
            days: 1,
            name: 'Plano estudante',
            payment_methods: ['credit_card']
        }))
        .then(plano => console.log(plano))
    }

    obtemSaldo() {
        pagarme.client.connect({ api_key: API_KEY })
        .then(client => client.balance.primary())
        .then(balance => console.log(balance))
    }
}

module.exports = PagamentoRecorrencia;
