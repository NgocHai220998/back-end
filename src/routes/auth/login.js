const jwt = require('jsonwebtoken')
const userModel = require('../../models/userModel.js')

module.exports = (req, res) => {
  if (!req.body.email) {
    res.json({
      code: 403,
      title: 'Error',
      data: {
        message: 'Email is a required field'
      }
    })
  } else if (!req.body.password) {
    res.json({
      code: 410,
      title: 'Error',
      data: {
        message: 'Password is a required field'
      }
    })
  } else {
    // to valid email
    userModel.validEmail(req.body.email).then((result) => {
      if (result.code == 401) { // Email is valid
        if (req.body.password == result.data.password) {
          if (result.data.isConfirmbyEmail == true) {
            jwt.sign({
              user: {
                email: result.data.email,
                userID: result.data.userID
              }
            }, 'secretkey', (err, token) => {
              res.json({
                code: 200,
                title: 'Success',
                data: {
                  message: 'Login success...',
                  user: {
                    email: result.data.email,
                    token: token,
                    userID: result.data.userID,
                    information: result.data.information
                  }
                }
              });
            });
          } else { // Email has not confirmed account to register
            res.json({
              code: 406,
              title: 'Error',
              data: {
                message: 'Please check your email to confirm'
              }
            })
          }
          
        } else { // Incorrect password!
          res.json({
            code: 411,
            title: 'Error',
            data: {
              message: 'Incorrect password!'
            }
          })
        }
      } else if (result.code == 405) { // Email does not exist!
        res.json({
          code: 405,
          title: 'Error',
          data: {
            message: 'Email does not exist!'
          }
        });
      }
    }).catch((err) => {
      res.sendStatus(400).send(err);
    })
  }
}