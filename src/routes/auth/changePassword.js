const userModel = require('../../models/userModel.js');

module.exports = (req, res) => {
  console.log("hello")
  if (!req.body.password) {
    res.json({
      code: 410,
      title: 'Error',
      data: {
        message: 'Password is required...'
      }
    })
  } else if (!req.body.token) {
    res.json({
      code: 430,
      title: 'Error',
      data: {
        message: 'Tokens do not exist or expire!'
      }
    })
  } else if (!req.body.emailCode) {
    res.json({
      code: 440,
      title: 'Error',
      data: {
        message: 'emailCode is required...'
      }
    })
  } else {
    userModel.changePassword(req.body).then((result) => {
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
              messge: 'Change password success...',
              user: result
            }
          })
        }
      } else {
        res.json({
          code: 451,
          title: 'Error',
          data: {
            message: 'Change password fail!'
          }
        })
      }
    }).catch((err) => {
      res.sendStatus(400).send(err);
    })
  }
}