# Docfy :spiral_notepad::spiral_notepad::spiral_notepad:

A simple web app to document any project you're working with

## Installing

Just clone the repository or download the zip file.

Once in the project folder run `npm install` to intall all the project's dependencies.

###Setting up the database :ballot_box:

You'll need to have MySql installed in your computer to run this project properly. With that said, you may go to the file `config/database.js` to properly configure the communication with the database installed in your computer.

Inside `database.js` you'll find the following:

```javascript
module.exports = {
  username: 'root',
  password: 'root',
  database: 'Docfy',
  host: '127.0.0.1',
  dialect: 'mysql',
  port: '3303',
};
```

Make sure to set the values according to your local configurantion of your database.

Before continuing, make sure to create a **new database** called *Docfy* with enconding of `UTF-8 Unicode (utf8)` and collation of `utf8_general_ci`

### Migrations

We are almost there, all you need to do now is, in your terminal, run `./node_modules/.bin/sequelize db:migrate`. By running this command, sequelize CLI will run all the pending migrations that will create and configure all the tables you'll need to use this project.

## Going live 🚀🚀🚀🚀🚀

After successfully installing the dependencies run `npm start` to start the development server. Now you'll be able to go to your web browser and go to `localhost:3000` to see the project live.

