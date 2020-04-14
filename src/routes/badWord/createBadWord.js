const badWordModel = require('../../models/badWordModel.js');

module.exports = (req, res) => {
    badWordModel.createBadWord(req.body).then((result) => {
      if (result.code === 200) {
        res.json({
          code: 200,
          title: 'Success',
          data: {
            message: 'Create badWord success',
            badWord: result.badWord
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