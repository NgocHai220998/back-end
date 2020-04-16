const userModel = require('../../models/userModel.js');

module.exports = (req, res) => {
    userModel.updatePosition(req.body).then((result) => {
      if (result.code === 200) {
        res.json({
          code: 200,
          title: 'Success',
          data: {
            message: 'Update ok',
            main: result.main,
            pets: result.pets
          }
        })
      } else {
        res.json({
          code: 403,
          title: 'Err',
          data: {
            message: 'Update err'
          }
        })
      }
    })
}