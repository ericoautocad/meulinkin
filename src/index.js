module.exports = (app) => {
    app.use('/', require('./controller/home/index'));
};