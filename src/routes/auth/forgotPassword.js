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
    userModel.forgotPassword(req.body).then((result) => {
      if (result) {
        if (result.result === false) {
          res.json({
            code: 451,
            title: 'Error',
            data: {
              message: 'Email does not match or expired!'
            }
          })
        } else {
          res.json({
            code: 200,
            title: 'Success',
            data: {
              message: 'Forgot password success...',
              user: result
            }
          })
        }
      } else {
        res.json({
          code: 451,
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