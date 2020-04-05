const router = require('express').Router();
const constants = require('../../constants/api.js')();
const handleCreateUser = require('./createUser.js');
const handleSendmail = require('./sendMail.js');
const handleUpdateProfile = require('./updateProfile.js');
const handleGetTokenForRegister = require('./getTokenForRegister');
const handleChangeAvatar = require('../auth/changeAvatar.js');
const handleLogin = require('../auth/login.js');
const handleSendEmailCode = require('../auth/sendEmailCode.js');
const handleChangePassword = require('../auth/changePassword.js');
const handleForgotPassword = require('../auth/forgotPassword.js');

module.exports = () => {
  router.post(constants.USER.CREATE_USER, handleCreateUser);
  router.post(constants.USER.SEND_MAIL_REGISTER, handleSendmail);
  router.put(constants.USER.UPDATE_PROFILE, handleUpdateProfile);
  router.post(constants.USER.GET_TOKEN_FOR_REGISTER, handleGetTokenForRegister);
  router.put(constants.USER.CHANGE_AVATAR, handleChangeAvatar);
  router.post(constants.USER.LOGIN, handleLogin);
  router.post(constants.USER.SEND_EMAIL_CODE, handleSendEmailCode);
  router.put(constants.USER.CHANGE_PASSWORD, handleChangePassword);
  router.put(constants.USER.FORGOT_PASSWORD, handleForgotPassword);
  return router;
}