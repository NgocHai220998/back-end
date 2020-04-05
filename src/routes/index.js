const authRoute = require('./auth')();
const constant = require('../constants/api')();


module.exports = (app) => {
  app.use(constant.ROOT_API.AUTH, authRoute);
}