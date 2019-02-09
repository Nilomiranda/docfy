module.exports = {
  checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', 'Not authorized');
      return res.redirect('/');
    }
    return next();
  },
};
