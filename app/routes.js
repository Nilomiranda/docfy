const express = require('express');

const routes = express.Router();

const authController = require('./controller/authController');
const guestController = require('./controller/guestController');

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

/**
* rotas de autenticacao
*/
routes.get('/', authController.signin); // tela de login
routes.get('/signup', authController.signup); // tela de criacao de conta

routes.get('/signout', authController.signout); // rota para sair da conta

routes.post('/login', authController.login); // rota de autenticacao
routes.post('/register', authController.register);

routes.get('/dashboard', guestController.checkLogin, (req, res) => {
  res.render('dashboard/index.njk');
});

/**
 * rotas para os projetos
 */

routes.get('/dashboard/projects/example', (req, res) => {
  res.render('dashboard/project');
});

module.exports = routes;
