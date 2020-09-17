// função de validação da senha
module.exports = function(req, res, next)
{
    if (req.body.senha !== req.body.csenha){
        return res.send('Aqui acontece a validação. as senhas não conferem');
    }
    return next();
};