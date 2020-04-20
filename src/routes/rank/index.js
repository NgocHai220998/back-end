const router = require('express').Router();
const constants = require('../../constants/api.js')();
const handleGetRanks = require('../rank/getRanks.js')

module.exports = () => {
  router.get(constants.RANK.GET_RANKS, handleGetRanks); // maintain okie
  return router;
}