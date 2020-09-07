const express = require('express');
const router = express.Router();

router.get('/pro', (req, res) => {

    return res.render('pagamento/pagamento');

});

module.exports = router;
