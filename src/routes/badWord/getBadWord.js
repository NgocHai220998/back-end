const badWordModel = require('../../models/badWordModel.js');

module.exports = (req, res) => {
    badWordModel.getBadWords(req.params.email).then((result) => {
      if (result.code === 200) {
        res.json({
          code: 200,
          title: 'Success',
          data: {
            message: 'get badWords success',
            badWords: result.badWords
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