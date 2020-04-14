const badWordModel = require('../../models/badWordModel.js');

module.exports = (req, res) => {
    badWordModel.deleteBadWord(req.params.ID).then((result) => {
      if (result.code === 200) {
        res.json({
          code: 200,
          title: 'Success',
          data: {
            message: 'Delete badWord success'
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