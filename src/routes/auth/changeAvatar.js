const userModel = require('../../models/userModel.js');

module.exports = (req, res) => {
  if (!req.body.srcAvatar) {
    res.json({
      code: 440,
      title: 'Error',
      data: {
        message: 'srcAvatar is required!'
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
  } else {
    userModel.changeAvatar(req.body).then((result) => {
      if (result.code == 200) {
        res.json({
          code: 200,
          title: 'Success',
          data: {
            message: 'Change avatar success...',
            avatar: result.data.srcAvatar
          }
        })
      } else if (result.code == 421) {
        res.json({
          code: 421,
          title: 'Error',
          data: {
            message: 'Change avatar fail!'
          }
        })
      } else if (result.code == 404) {
        res.json({
          code: 404,
          title: 'Error',
          data: {
            message: 'User not found'
          }
        })
      }
    }).catch((err) => {
      res.sendStatus(400).send(err);
    })
  }

}