const { User } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  signin(req, res) {
    return res.render('auth/signin');
  },

  signup(req, res) {
    return res.render('auth/signup');
  },

  async register(req, res) {
    const { email } = req.body;

    if (await User.findOne({ where: { email } })) {
      req.flash('error', 'User already registerd ');
      return res.redirect('back');
    }

    const password = await bcrypt.hash(req.body.password, 5);

    await User.create({ ...req.body, password });

    req.flash('success', 'User successfully registered');
    return res.redirect('/');
  },

  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    // verificao do usuario digitado
    if (!user) {
      /**
      * se usuario for undefined, invertemos a logica para entrar ness condicao
      * e manter o usuario na tela de login
      */
      req.flash('error', 'User doesn\'t exist');
      return res.redirect('/');
    }

    // verificao da senha digitada
    if (!await bcrypt.compare(password, user.password)) {
      /**
      * se a senha estiver incorreta, invertemos a logica para entrar ness condicao
      * e manter o usuario na tela de login
      */
      req.flash('error', 'Wrong password');
      return res.redirect('/');
    }

    // salva sessao no banco e redireciona para dashboard
    req.session.user = user; // configura os dados do usuario no cookie da sessao
    return req.session.save(() => {
      res.redirect('/dashboard');
    });
  },

  signout(req, res) {
    req.session.destroy();
    return res.redirect('/');
  },
};
