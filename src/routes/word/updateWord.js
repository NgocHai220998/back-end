const wordModel = require('../../models/wordModel.js');

module.exports = (req, res) => {
    wordModel.updateWord(req.body, req.params.ID).then((result) => {
      if (result.code === 200) {
        res.json({
          code: 200,
          title: 'Success',
          data: {
            message: 'update word success',
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