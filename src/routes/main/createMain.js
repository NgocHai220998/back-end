const userModel = require('../../models/userModel.js');

module.exports = (req, res) => {
    if (!req.body.token) {
        res.json({
            code: 400,
            title: 'error',
            data: {
                message: "token is a required field"
            }
        })
    } else if (!req.body.main) {
        res.json({
            code: 410,
            title: 'error',
            data: {
                message: "main is a required field"
            }
        })
    } else {
      userModel.createMain(req.body).then((result) => {
        if (result.code === 200) {
            res.json({
                code: 200,
                title: 'Success',
                data: {
                    message: 'Create the main successfully',
                    user: result.data
                }
            })
        } else if (result.code === 404) {
            res.json({
                code: 404,
                title: 'Error',
                data: {
                    message: 'user not found'
                } 
            })
        } else {
            res.json({
                code: 403,
                title: 'Error',
                data: {
                    message: 'Unable to save user'
                } 
            })
        }
      }).catch((err) => {
        res.sendStatus(400).send(err);
      })
    }
}