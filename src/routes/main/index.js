const router = require('express').Router();
const constants = require('../../constants/api.js')();
const handleCreateMain = require('../main/createMain.js')

module.exports = () => {
  router.post(constants.MAIN.CREATE_MAIN, handleCreateMain); // maintain okie
  return router;
}