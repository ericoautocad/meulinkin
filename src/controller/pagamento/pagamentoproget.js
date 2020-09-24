const Assinatura = require('../../service/Assinatura');

module.exports = async (req, res) => {

    const servicoAssinatura = new Assinatura();
    const data = await servicoAssinatura.criarAssinaturaFree(1);
    console.log(data);

    return res.render('pagamento/pagamento');

};