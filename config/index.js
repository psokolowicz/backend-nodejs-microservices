const dotEnv = require("dotenv");

const configFile = `./.env.dev`;
dotEnv.config({ path: configFile });

module.exports = {
  LOGIN_PORT: process.env.LOGIN_PORT,
  NEGOCIO_PORT: process.env.NEGOCIO_PORT,
  NEGOCIO_URL: process.env.NEGOCIO_URL,
  DB_URL: process.env.DB_URL,
  APP_SECRET_USER: process.env.APP_SECRET_USER,
  APP_SECRET_ENDPOINT: process.env.APP_SECRET_ENDPOINT,
};
