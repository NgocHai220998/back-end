const userModel = require('../../models/userModel.js');

module.exports = (req, res) => {
    if (req.body.token) {
        // confirm to register
        userModel.confirmEmail(req.body.token).then((result) => {
            if (result.code == 200) {
                // console.log(result.data);
                res.json({
                    code: 200, // Ok
                    title: 'Success',
                    data: {
                        message: 'Confirm email success.',
                    }
                })
            } else if (result.code == 421) {
                res.json({
                    code: 421, // err
                    title: 'Error',
                    data: {
                        message: 'Confirm email fail'
                    }
                })
            } else if (result.code == 404) {
                res.json({
                    code: 404, // User not found
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
                message: 'Token is a required field'
            }
        })
    }
    
}