/**
 * controller para buscar os projetos que o usuario tem
 * cadastrado
 */

const { Project } = require('../models');

module.exports = {
  async index(req, res) {
    const projects = await Project.findAndCountAll({
      where: {
        userId: req.session.user.id,
      },
    });
    console.log('A LISTA DE PROJETOS ESTA AQUI', projects.rows);
    if (projects.rows.length === 0) {
      projects.rows = null;
    }
    return res.render('dashboard/index', {
      projects: projects.rows,
      userName: req.session.user.name,
      projectCount: projects.count,
      userId: req.session.user.id,
    });
  },
};
