module.exports = {
  checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', 'Nao autorizado');
      return res.redirect('/');
    }
    return next();
  },
};
