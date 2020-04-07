const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const token = require('../constants/token.js');

const userSchema = new Schema({
    emailCode: Number,
    password: String,
    userID: String,
    email: String,
    srcAvatar: String,
    isConfirmbyEmail: {
        type: Boolean,
        default: false
    }
})

const users = mongoose.model('user', userSchema);

/**
 * insert user to database
 * @param {userSchema} user 
 */
function createUser(user) {
    return new Promise((resolve, reject) => {
        users.create(user, (err, result) => {
            if (err) {
                reject(new Error('Error: create user'));
            } else {
                if (result) {
                    resolve({
                        code: 200, // Successfully create new user
                        data: result
                    })
                } else {
                    resolve({
                        code: 420 // Error
                    })
                }
            }
        })
    })
}

/**
 * @function: to valid email
 * @param {String} email 
 */
function validEmail(email) {
    return new Promise((resolve, reject) => {
        users.findOne({ email: email }, (err, result) => {
            if (err) {
                reject(new Error('Error: valid email'));
            } else {
                if (result) {
                    resolve({
                        code: 401, // Email was registered
                        data: result
                    });
                } else {
                    resolve({
                        code: 200 // Email is valid
                    })
                }
            }
        })
    })
}

/**
 * @function: confirm to register
 * @param {*} _token 
 */

function confirmEmail(_token) {
    return new Promise((resolve, reject) => {
        // get information from token
        token.verify(_token).then((data) => {
            users.findOne({ email: data.email }, (err, result) => {
                if (err) {
                    reject(new Error('Error: confirm email'));
                } else {
                    if (result) {
                        result.isConfirmbyEmail = true; // to confirm
                        result.save((err, newUser) => {
                            if (err) {
                                console.log(err);
                                reject(new Error('Error: confirm email'));
                            } else {
                                if (newUser) {
                                    resolve({
                                        code: 200, // confirm success
                                        data: newUser
                                    })
                                } else {
                                    resolve({
                                        code: 421 // Err
                                    })
                                }
                            }
                        });
                    } else {
                        resolve({
                            code: 404 // err
                        })
                    }
                }
            });
        }).catch((err) => {
            // console.log(err);
            reject(new Error('Somthing went Error!'));
        })
    });
}
/**
 * @function: Change password
 * @param {*} body 
 */
function forgotPassword(body) {
    return new Promise((resolve, reject) => {
        users.findOne({ email: body.email }, (err, user) => {
            if (err) {
                console.log(err);
                reject(new Error('Something went error'));
            } else {
                if (user) {
                    if (user.emailCode == body.emailCode) {
                        user.password = body.password;
                        user.save((error, result) => {
                            if (error) {
                                console.log(error);
                                reject(new Error('Something went error'));
                            } else {
                                resolve({
                                    result: result,
                                    code: 200 // Okie
                                });
                            }
                        })
                    } else {
                        resolve({ 
                            code: 401, // code is not match
                        });
                    }
                } else {
                    resolve({ 
                        code: 404, // code is not match
                    });
                }

            }
        })
    })
}

function setEmailCode(data) {
    users.findOne({ email: data.email }, (err, user) => {
        if (err) {
            console.log(err + '');
            throw err;
        } else {
            if (user) {
                user.emailCode = data.emailCode
                setTimeout(function () {
                    setEmailCode({
                        emailCode: new Date().getTime(),
                        email: user.email
                    });
                }, 150000)
                user.save((error) => {
                    if (error) {
                        console.log(error + '');
                        throw error;
                    } else {
                        console.log('Set email code success!');
                    }
                });
            } else {
                console.log('Set email code fail!')
            }
        }
    })
}

function getInfoUserByUserID(userID) {
    return new Promise((resolve, reject) => {
        users.findOne({ userID: userID }, (err, user) => {
            if (err) {
                reject(new Error('Error: get info user by userID'));
            } else {
                if (user) {
                    resolve({
                        code: 200,
                        data: {
                            email: user.email,
                            userID: user.userID,
                            srcAvatar: user.srcAvatar
                        }
                    })
                } else {
                    resolve({
                        code: 441
                    })
                }
            }
        })
    })
}



module.exports = {
    createUser,
    validEmail,
    users,
    confirmEmail,
    forgotPassword,
    setEmailCode,
    getInfoUserByUserID
}