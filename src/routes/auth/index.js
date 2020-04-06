const router = require('express').Router();
const constants = require('../../constants/api.js')();
const handleCreateUser = require('./createUser.js');
const handleSendEmailRegister = require('./sendEmailRegister.js');
const handleUpdateProfile = require('./updateProfile.js');
const handleConfirmRegister = require('./confirmRegister');
const handleChangeAvatar = require('../auth/changeAvatar.js');
const handleLogin = require('../auth/login.js');
const handleSendEmailCode = require('../auth/sendEmailCode.js');
const handleChangePassword = require('../auth/changePassword.js');
const handleForgotPassword = require('../auth/forgotPassword.js');

module.exports = () => {
  router.post(constants.USER.CREATE_USER, handleCreateUser); // maintain okie
  router.put(constants.USER.UPDATE_USER, handleUpdateProfile); // Error
  router.post(constants.USER.SEND_MAIL_REGISTER, handleSendEmailRegister); // maintain okie
  router.post(constants.USER.CONFIRM_REGISTER, handleConfirmRegister); // maintain okie

  router.put(constants.USER.CHANGE_AVATAR, handleChangeAvatar); // Error
  router.post(constants.USER.LOGIN, handleLogin); // maintain okie
  router.post(constants.USER.SEND_EMAIL_CODE, handleSendEmailCode); // maintain okie
  router.put(constants.USER.CHANGE_PASSWORD, handleChangePassword); // Error
  router.put(constants.USER.FORGOT_PASSWORD, handleForgotPassword); // Error
  return router;
}