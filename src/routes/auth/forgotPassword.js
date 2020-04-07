const userModel = require('../../models/userModel.js');

module.exports = (req, res) => {
  if (!req.body.password) {
    res.json({
      code: 410,
      title: 'Error',
      data: {
        message: 'Password is a required field'
      }
    })
  } else if (!req.body.email) {
    res.json({
      code: 403,
      title: 'Error',
      data: {
        message: 'Email is a required field'
      }
    })
  } else if (!req.body.emailCode) {
    res.json({
      code: 440,
      title: 'Error',
      data: {
        message: 'emailCode is a required field'
      }
    })
  } else {
    // forgot
    userModel.forgotPassword(req.body).then((result) => {
      if (result) {
        if (result.code === 401) {
          res.json({
            code: 451,
            title: 'Error',
            data: {
              message: 'Code does not match or expired!'
            }
          })
        } else if (result.code === 200) {
          res.json({
            code: 200,
            title: 'Success',
            data: {
              message: 'Forgot password success...',
              user: result.result
            }
          })
        } else if (result.code === 404) {
          res.json({
            code: 404,
            title: 'Error',
            data: {
              message: 'Email not is register',
              user: result
            }
          })
        }
      } else {
        res.json({
          code: 401,
          title: 'Error',
          data: {
            message: 'Forgot password fail!'
          }
        })
      }
    }).catch((err) => {
      res.sendStatus(400).send(err);
    })
  }
}