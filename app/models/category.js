const hljs = require('highlight.js');
const md = require('markdown-it')({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre class="hljs"><code>${hljs.highlight(lang, str.trim(), true).value}</code></pre>`;
    }

    return `<pre class="hljs"><code>${md.utils.escapeHtml(str.trim())}</code></pre>`;
  },
});

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
  }, {
    getterMethods: {
      formattedContent() {
        return md.render(this.content);
      },
    },
  });

  // criando a relacao com a tabela de projetos
  Category.associate = (models) => {
    Category.belongsTo(models.Project); // as categorias pertencem a cada PROJETO
  };

  return Category;
};
