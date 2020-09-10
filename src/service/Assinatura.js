const UsuarioModel = require('./../model/usuario');
const AssinaturaModel = require('./../model/assinatura');
const Sequelize = require('./../model/database');
const PagamentoRecorrencia = require('./PagamentoRecorrencia');

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
                    usuario_id: usuario.id,
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
    async criarAssinaturaProfessional(idUsuario, dadosFormulario) {
        
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
                    plano_id: 2,
                    data_inicio: new Date(),
                    tipo: 'paga',
                    status: 'ativa'
                };

                const assinaturasAtualizadas = AssinaturaModel.update(
                    {
                        data_fim: new Date(),
                        status: 'desativada' 
                    },
                    { 
                        where: { 
                            usuario_id: idUsuario,
                            status: 'ativa' 
                        }
                    },
                    { transaction: t }
                );

                const pagamento = new PagamentoRecorrencia();
                const contratacao = await pagamento.criarAssinatura(dadosFormulario);

                if(!contratacao.id) {
                    throw new Error('contratacao invalida.');
                }

                dadosAssinatura.assinatura_pagamento_id = contratacao.id;

                const assinatura = await AssinaturaModel.create(dadosAssinatura, { transaction: t });
        
                return assinatura;

            });

            return assinaturaCriada;


        } catch (error) {

            return false;
        
        }
    }

    // trocar cartao assinatura
    async trocarCartaoAssinatura(idAssinatura, dadosFormulario) {
        
        try {
            
            const assinaturaAtualizada = await Sequelize.transaction(async (t) => {

                const assinatura = await AssinaturaModel.findOne({
                    where: {assinatura_pagamento_id: idAssinatura, status: 'ativa'}
                }, { transaction: t });

                if(!assinatura) {
                    throw new Error('assinatura nao encontrada.');
                }

                const pagamento = new PagamentoRecorrencia();
                const contratacao = await pagamento.atualizarAssinatura(idAssinatura, dadosFormulario);

                if(!contratacao.id) {
                    throw new Error('contratacao invalida.');
                }

                return assinatura;

            });

            return assinaturaAtualizada;


        } catch (error) {

            return false;
        
        }
    }

    // cancelar assinatura
    async cancelarAssinatura(idUsuario) {
        try {
            
            const assinaturaAtualizada = await Sequelize.transaction(async (t) => {

                const assinatura = await AssinaturaModel.findOne({
                    where: {
                        usuario_id: idUsuario,
                        plano_id: 2,
                        tipo: 'paga',
                        status: 'ativa'
                    }
                }, { transaction: t });

                if(!assinatura) {
                    throw new Error('assinatura nao encontrada.');
                }

                const pagamento = new PagamentoRecorrencia();
                const cancelamento = await pagamento.cancelarAssinatura(assinatura.assinatura_pagamento_id);

                if(!cancelamento.id) {
                    throw new Error('cancelamento invalido.');
                }
                console.log(cancelamento);

                const desativaAsinaturaPaga = AssinaturaModel.update(
                    {
                        data_fim: new Date(),
                        status: 'desativada' 
                    },
                    { 
                        where: {
                            usuario_id: idUsuario,
                            plano_id: 2,
                            tipo: 'paga',
                            status: 'ativa' 
                    }},
                    { transaction: t }
                );

                const dadosAssinatura = {
                    usuario_id: idUsuario,
                    plano_id: 1,
                    data_inicio: new Date(),
                    tipo: 'gratis',
                    status: 'ativa'
                };

                const novaAssinatura = await AssinaturaModel.create(dadosAssinatura, { transaction: t });

                return novaAssinatura;

            });

            return assinaturaAtualizada;


        } catch (error) {
            console.log('erro: ', error)
            return false;
        
        }
    }
}

module.exports = Assinatura;