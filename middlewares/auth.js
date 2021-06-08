module.exports = {
  requireAuth: (req, res, next) => {
    if (!req.user) {
      res.redirect('/');
    } else {
      next();
    }
  },
  requireGuest: (req, res, next) => {
    if (req.user) {
      res.redirect('/dashboard');
    } else {
      next();
    }
  },
};
