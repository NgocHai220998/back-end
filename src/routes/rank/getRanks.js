const rankModel = require('../../models/rankModel.js');

module.exports = (req, res) => {
    rankModel.getRanks().then((result) => {
      res.json({
        data: result
      })
    }).catch((err) => {
      res.statusCode(400).send('err')
    })
}