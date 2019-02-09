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
