const Assinatura = require('./../../service/Assinatura');

module.exports = async (req, res) => {
    
    const servicoAssinatura = new Assinatura();

    try {

        let inputParams = await servicoAssinatura.buscarDadosAssinatura(req.user.id);
        if (inputParams.pagamento == null) {
            inputParams.temporario = true;
        }
        console.log(inputParams)

        return res.render('conta/minhaconta', { inputParams });


    } catch(erro) {

        console.log(erro);

        return res.render('conta/minhaconta');

    }

};