const authRoute = require('./auth')();
const mainRoute = require('./main')();
const constant = require('../constants/api')();


module.exports = (app) => {
  app.use(constant.ROOT_API.AUTH, authRoute);
  app.use(constant.ROOT_API.MAIN, mainRoute);
}