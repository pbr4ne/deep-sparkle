const { Sequelize } = require('sequelize');
const config = require('config');
const Reminder = require('../modules/reminder/reminderModel');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'database.sqlite',
  });

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({force: true});
    console.log('Sequelize connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;