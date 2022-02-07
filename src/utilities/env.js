require('dotenv').config({path: '.env' + (process.env.NODE_ENV ? '.' + process.env.NODE_ENV : '')});

module.exports = {
  CLIENT_TOKEN: process.env.CLIENT_TOKEN,
  CHANNEL_ID: process.env.CHANNEL_ID,
  TRANSLATION_API_URL: process.env.TRANSLATION_API_URL,
  TRANSLATION_API_KEY: process.env.TRANSLATION_API_KEY,
};
