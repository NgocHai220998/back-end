const router = require('express').Router();
const constants = require('../../constants/api.js')();
const handleCreateExample = require('../example/createExample.js')
const handleUpdateExample = require('../example/updateExample.js')
const handleDeleteExample = require('../example/deleteExample.js')
const handleGetExamples = require('../example/getExamples.js')

module.exports = () => {
  router.post(constants.EXAMPLE.CREATE_EXAMPLE, handleCreateExample); // maintain okie
  router.put(constants.EXAMPLE.UPDATE_EXAMPLE, handleUpdateExample); // maintain okie
  router.delete(constants.EXAMPLE.DELETE_EXAMPLE, handleDeleteExample); // maintain okie
  router.get(constants.EXAMPLE.GET_EXAMPLES, handleGetExamples); // maintain okie
  return router;
}