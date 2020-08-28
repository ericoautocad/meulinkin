const { validationResult } = require('express-validator');

// can be reused by many routes
const validaRequisicao = validations => {
    return async (req, res, next) => {
      await Promise.all(validations.map(validation => validation.run(req)));
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      req.erros_validacao = errors.array();
      
      return next();
    };
  };
  
module.exports = validaRequisicao;