const exampleModel = require('../../models/exampleModel.js');

module.exports = (req, res) => {
    exampleModel.getExamples(req.params.email).then((result) => {
      if (result.code === 200) {
        res.json({
          code: 200,
          title: 'Success',
          data: {
            message: 'get examples success',
            examples: result.examples
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