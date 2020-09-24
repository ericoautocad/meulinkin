const express = require('express');
const router = express.Router();

const controles = () => {

    router.get('/perfil', 
    function(req, res)
    {
    
        return res.render('perfil/perfil');
    });

    return router;

};

module.exports = controles;