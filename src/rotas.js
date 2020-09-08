module.exports = (app) => {
    // app.use('/', require('./controller/home/index'));
    app.use('/', require('./controller/usuario/index'));
    app.use('/pagamento', require('./controller/pagamento/index'));
};