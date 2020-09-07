const UsuarioModel = require('./../model/usuario');
const AssinaturaModel = require('./../model/assinatura');
const Sequelize = require('./../model/database');

class Assinatura {

    constructor() {
        
    }

    // criar assinatura free
    async criarAssinaturaFree(idUsuario) {
        
        
        try {
            
            const assinaturaCriada = await Sequelize.transaction(async (t) => {

                const usuario = await UsuarioModel.findOne({
                    where: {id: idUsuario}
                }, { transaction: t });

                if(!usuario) {
                    throw new Error('usuário nao encontrado.');
                }
        
                const dadosAssinatura = {
                    usuario_id: idUsuario,
                    plano_id: 1,
                    data_inicio: new Date(),
                    tipo: 'gratis',
                    status: 'ativa'
                };

                const assinatura = await AssinaturaModel.create(dadosAssinatura, { transaction: t });
        
                return assinatura;

            });

            return assinaturaCriada;


        } catch (error) {

            return false;
        
        }


    }
    // criar assinatura paga
    criarAssinaturaProfessional(idUsuario, dadosAssinatura) {

    }
    // trocar cartao assinatura
    // cancelar assinatura
}

module.exports = Assinatura;