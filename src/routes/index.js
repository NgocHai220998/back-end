const authRoute = require('./auth')();
const mainRoute = require('./main')();
const wordRoute = require('./word')();
const badWordRoute = require('./badWord')();
const exampleRoute = require('./example')();
const constant = require('../constants/api')();


module.exports = (app) => {
  app.use(constant.ROOT_API.AUTH, authRoute);
  app.use(constant.ROOT_API.MAIN, mainRoute);
  app.use(constant.ROOT_API.WORD, wordRoute);
  app.use(constant.ROOT_API.EXAMPLE, exampleRoute);
  app.use(constant.ROOT_API.BADWORD, badWordRoute);
}