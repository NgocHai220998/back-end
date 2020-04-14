const exampleModel = require('../../models/exampleModel.js');

module.exports = (req, res) => {
    exampleModel.updateExample(req.body, req.params.ID).then((result) => {
      if (result.code === 200) {
        res.json({
          code: 200,
          title: 'Success',
          data: {
            message: 'update example success',
            example: result.example
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