const wordModel = require('../../models/wordModel.js');

module.exports = (req, res) => {
    if (!req.body.token) {
      res.json({
        code: 403,
        title: 'Error',
        data: {
          message: 'token is a required field'
        }
      })
    } else {
      wordModel.createWord(req.body).then((result) => {
        if (result.code === 200) {
          res.json({
            code: 200,
            title: 'Success',
            data: {
              message: 'Create word success',
              word: result.word
            }
          })
        } else {
          res.json({
            code: 403,
            title: 'Error',
            data: {
              message: 'fail'
            }
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
}