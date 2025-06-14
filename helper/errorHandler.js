// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);

  // Handle API vs Page rendering
  if (req.originalUrl.startsWith('/api')) {
    return res.json({
      success: false,
      message: err.message || 'Server Error',
    });
  }

  // Render error view for web pages
  res.render('error', {
    error: err.message || 'Something went wrong.',
  });
};
