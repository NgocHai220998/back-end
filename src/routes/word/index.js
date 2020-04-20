const router = require('express').Router();
const constants = require('../../constants/api.js')();
const handleCreateWord = require('../word/createWord.js')
const handleUpdateWord = require('../word/updateWord.js')
const handleDeleteWord = require('../word/deleteWord.js')
const handleGetWords = require('../word/getWords.js')

module.exports = () => {
  router.post(constants.WORD.CREATE_WORD, handleCreateWord); // maintain okie
  router.put(constants.WORD.UPDATE_WORD, handleUpdateWord); // maintain okie
  router.delete(constants.WORD.DELETE_WORD, handleDeleteWord); // maintain okie
  router.get(constants.WORD.GET_WORDS, handleGetWords); // maintain okie
  return router;
}