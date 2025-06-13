const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yoursecret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

exports.adminOnly = (req, res, next) => {
  this.authMiddleware(req, res, () => {
    if (!req.user.isAdmin) return res.status(403).send('Access denied');
    next();
  });
};