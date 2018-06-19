/**
 * controller para adicionar novos projetos no banco de dados
 */

const { Project } = require('../models');

module.exports = {
  async addProject(req, res) {
    await Project.create({
      ...req.body,
      UserId: req.session.user.id,
    });
    return res.redirect('/dashboard');
  },

  async deleteProject(req, res) {
    const { projectId } = req.params;
    await Project.destroy({ where: { id: projectId } });
    return res.redirect('/dashboard');
  },
};
