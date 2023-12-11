function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the error for debugging purposes
  
    // Check if the error is a custom error with a status code, otherwise default to 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({
      error: {
        message: err.message || 'Internal Server Error',
      },
    });
  }
  
  module.exports = {
    errorHandler
  };