const userModel = require('../../models/userModel.js');

module.exports = (req, res) => {
    if (req.body.token) {
        userModel.confirmEmail(req.body.token).then((result) => {
            if (result.code == 200) {
                // console.log(result.data);
                res.json({
                    code: 200,
                    title: 'Success',
                    data: {
                        message: 'Confirm email success.',
                    }
                })
            } else if (result.code == 421) {
                res.json({
                    code: 421,
                    title: 'Error',
                    data: {
                        message: 'Confirm email fail'
                    }
                })
            } else if (result.code == 404) {
                res.json({
                    code: 404,
                    title: 'Error',
                    data: {
                        message: 'User not found'
                    }
                })
            }
        }).catch((err) => {
            res.sendStatus(400).send(err);
        })
    } else {
        res.json({
            code: 430,
            title: 'Error',
            data: {
                message: 'Token is required'
            }
        })
    }
    
}