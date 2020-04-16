const userModel = require('../../models/userModel.js');

module.exports = (req, res) => {
    userModel.getUserByEmail(req.params.email).then((result) => {
      if (result.code === 200) {
        res.json({
          code: 200,
          title: 'Success',
          data: {
            message: 'getUser ok',
            user: result.user
          }
        })
      } else {
        res.json({
          code: 403,
          title: 'Err',
          data: {
            message: 'getUser err'
          }
        })
      }
    })
}