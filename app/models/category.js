module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
  });

  // criando a relacao com a tabela de projetos
  Category.associate = (models) => {
    Category.belongsTo(models.Project); // as categorias pertencem a cada PROJETO
  };

  return Category;
};
