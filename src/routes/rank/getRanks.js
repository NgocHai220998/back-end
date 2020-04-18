const rankModel = require('../../models/rankModel.js');

module.exports = (req, res) => {
    rankModel.getRanks().then((result) => {
      if (result.code === 200) {
        res.json({
          code: 200,
          title: 'Success',
          data: {
            message: 'get ranks success',
            ranks: result.rank
          }
        })
      } else {
        res.json({
          code: 404,
          title: 'Erro',
          data: {
            message: 'get ranks false',
            ranks: result.data
          }
        })
      }
    }).catch((err) => {
      res.statusCode(400).send('err')
    })
}