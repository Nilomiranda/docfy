const express = require('express');

const routes = express.Router();

const authController = require('./controller/authController');
const guestController = require('./controller/guestController');
const dashboardController = require('./controller/dashboardController');
const projectController = require('./controller/projectController');
const categoryController = require('./controller/categoryController');

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

routes.get('/dashboard', guestController.checkLogin, (req, res, next) => next());

/**
 * rotas para os projetos (dashboard)
 */

routes.get('/dashboard', dashboardController.index);

/**
 * rota de acesso ao projeto
 */

routes.get('/dashboard/:userId/project/:projectId', categoryController.listCategories);

/**
 * acesso a uma categoria de um projeto
 */

routes.get('/dashboard/:userId/project/:projectId/:categoryId', categoryController.showCategories);

/**
 * adicionando novos projetos na lista
 */
routes.post('/dashboard/newproject', projectController.addProject);

/**
 * exclusao dos projetos
 */
routes.delete('/dashboard/:userId/project/:projectId', projectController.deleteProject);

/**
 * acesso a pagina de criacao de novas categorias (secoes)
 */
routes.get('/dashboard/:userId/project/:projectId/new/section', categoryController.createCategory);

/**
 * salvar a nova categoria
 */
routes.post('/dashboard/:userId/project/:projectId/new/section/submit', categoryController.saveCategory);

/**
 * editar categoria selecionada
 */
routes.put('/dashboard/:userId/project/:projectId/:categoryId/update', categoryController.editCategory);

/**
 * apagar categoria
 */
routes.delete('/dashboard/:userId/project/:projectId/:categoryId/remove', categoryController.deleteCategory);

module.exports = routes;
