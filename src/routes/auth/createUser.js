const userModel = require('../../models/userModel.js');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    if (!req.body.email) {
        res.json({
            code: 400,
            title: 'error',
            data: {
                message: "Email is a required field"
            }
        })
    } else if (!req.body.password) {
        res.json({
            code: 410,
            title: 'error',
            data: {
                message: "Password is a required field"
            }
        })
    } else {
        // Check if email already exists
        userModel.validEmail(req.body.email).then((data) => {
            if (data.code == 401) {
                res.json({
                    code: 401,
                    title: 'error',
                    data: {
                        message: "Email is existed!"
                    }
                });
            } else if (data.code == 200) {
                // Create a new user
                userModel.createUser({
                    email: req.body.email,
                    password: req.body.password,
                    userID: new Date().getTime(),
                    information: {
                        name: {
                            firstName: req.body.information.name.firstName,
                            lastName: req.body.information.name.lastName
                        }
                    }
                }).then(async (result) => {
                    if (result.code == 200) {
                        res.json({
                            code: 200, // Successfully create new user
                            title: 'success',
                            data: {
                                message: "Successfully create new user!",
                                user: {
                                    information: result.data.information,
                                    userID: result.data.userID,
                                    email: result.data.email,
                                    token: await jwt.sign({ // Assign user information to the token
                                        user: {
                                            email: result.data.email,
                                            userID: result.data.userID
                                        }
                                    }, 'secretkey')
                                }
                            }
                        })
                    } else if (result.code == 420) {
                        res.json({
                            code: 420, // Error
                            title: 'error',
                            data: {
                                message: "Creating user fail!"
                            }
                        })
                    }
                }).catch((error) => {
                    throw (error);
                })
            }
        }).catch((err) => {
            res.sendStatus(400).send(err);
        })
    }



}