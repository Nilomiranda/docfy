module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
  });

  // criando as relacoes com a tabela de usuarios
  Project.associate = (models) => {
    Project.belongsTo(models.User); // os PROJETOS pertencem a cada USUARIO
    Project.hasMany(models.Category); // PROJETOS podem possuir muitas CATEGORIAS
  };

  return Project;
};
