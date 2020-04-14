const router = require('express').Router();
const constants = require('../../constants/api.js')();
const handleCreateBadWord = require('./createBadWord.js')
const handleUpdateBadWord = require('./updateBadWord.js')
const handleDeleteBadWord = require('./deleteBadWord.js')
const handleGetBadWords = require('./getBadWord.js')

module.exports = () => {
  router.post(constants.BADWORD.CREATE_BADWORD, handleCreateBadWord); // maintain okie
  router.put(constants.BADWORD.UPDATE_BADWORD, handleUpdateBadWord); // maintain okie
  router.delete(constants.BADWORD.DELETE_BADWORD, handleDeleteBadWord); // maintain okie
  router.get(constants.BADWORD.GET_BADWORDS, handleGetBadWords); // maintain okie
  return router;
}