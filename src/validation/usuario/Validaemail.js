//funçaõ de validação de email
module.exports = function (req, res, next) 
    {
        if (req.body.email !== req.body.cemail){
            return res.send('Aqui acontece a validação. os emails não conferem');
        }
        return next();
    };