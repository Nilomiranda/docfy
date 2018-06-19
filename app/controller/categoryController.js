const { Category, Project } = require('../models');

module.exports = {
  async listCategories(req, res) {
    const { projectId, userId } = req.params;
    const categories = await Category.findAll({
      where: { projectId },
    });
    const projects = await Project.findAll({ where: { id: projectId } });
    return res.render('dashboard/project', {
      categories,
      projects,
      userId,
      userName: req.session.user.name,
    });
  },

  async showCategories(req, res) {
    const { userId, projectId, categoryId } = req.params;
    const category = await Category.find({ where: { id: categoryId } });
    const categories = await Category.findAll({ where: { projectId } });
    const projects = await Project.findAll({ where: { id: projectId } });
    return res.render('dashboard/project', {
      categories,
      projects,
      category,
      userId,
      projectId,
      userName: req.session.user.name,
    });
  },

  async createCategory(req, res) {
    const { userId, projectId } = req.params;
    const categories = await Category.findAll({ where: { projectId } });
    const projects = await Project.findAll({ where: { id: projectId } });
    return res.render('dashboard/new', {
      categories,
      projects,
      userId,
      projectId,
      userName: req.session.user.name,
    });
  },

  async saveCategory(req, res) {
    const { title: name, content } = req.body;
    const { projectId: ProjectId } = req.params;
    await Category.create({ name, content, ProjectId });
    return res.redirect('back');
  },
};
