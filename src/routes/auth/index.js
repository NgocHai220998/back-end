const router = require('express').Router();
const constants = require('../../constants/api.js')();
const handleCreateUser = require('./createUser.js');
const handleSendEmailRegister = require('./sendEmailRegister.js');
const handleConfirmRegister = require('./confirmRegister');
const handleLogin = require('../auth/login.js');
const handleSendEmailCode = require('../auth/sendEmailCode.js');
const handleForgotPassword = require('../auth/forgotPassword.js');

module.exports = () => {
  router.post(constants.USER.CREATE_USER, handleCreateUser); // maintain okie
  router.post(constants.USER.SEND_MAIL_REGISTER, handleSendEmailRegister); // maintain okie
  router.post(constants.USER.CONFIRM_REGISTER, handleConfirmRegister); // maintain okie

  router.post(constants.USER.LOGIN, handleLogin); // maintain okie
  router.post(constants.USER.SEND_EMAIL_CODE, handleSendEmailCode); // maintain okie
  router.post(constants.USER.FORGOT_PASSWORD, handleForgotPassword); // Error
  return router;
}