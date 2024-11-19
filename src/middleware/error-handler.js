import { errorDictionary } from "../services/error-dict.js";

function errorHandler(err, req, res, next) {
    const errorMessage = errorDictionary[err.message] || 'Error interno del servidor.';
    
    res.status(err.status || 500).json({
      error: errorMessage,
      details: err.details || null
    });
  }

export default errorHandler;
