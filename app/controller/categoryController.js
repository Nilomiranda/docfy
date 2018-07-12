const { Category, Project } = require('../models');

module.exports = {
  async listCategories(req, res) {
    const { projectId, userId } = req.params;
    let { categoryId } = req.params;
    const categories = await Category.findAll({
      where: { projectId },
    });
    const projects = await Project.findAll({ where: { id: projectId } });
    if (!categoryId) {
      categoryId = null;
    }
    return res.render('dashboard/project', {
      categories,
      categoryId,
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

  async deleteCategory(req, res) {
    const { categoryId } = req.params;
    await Category.destroy({ where: { id: categoryId } });
    res.redirect('..');
  },

  async editCategory(req, res) {
    const { categoryId } = req.params;
    const { title: name, content } = req.body;
    const currentCategory = await Category.findById(categoryId);
    await currentCategory.update({ name, content });
    return res.redirect('back');
  },
};
