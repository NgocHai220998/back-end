const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const token = require('../constants/token.js');

const userSchema = new Schema({
    emailCode: Number,
    password: String,
    userID: String,
    email: String,
    srcAvatar: String,
    information: {
        name: {
            firstName: String,
            lastName: String
        },
        university: String,
        birthday: {
            date: String,
            month: String,
            year: String
        },
        address: {
            city: String,
            country: String
        }
    },
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
                        code: 200,
                        data: result
                    })
                } else {
                    resolve({
                        code: 420
                    })
                }
            }
        })
    })
}

/**
 * 
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
                        code: 401,
                        data: result
                    });
                } else {
                    resolve({
                        code: 405
                    })
                }
            }
        })
    })
}

/**
 * 
 * @param {req.body} body 
 */
function updateProfile(body) {
    return new Promise((resolve, reject) => {
        token.verify(body.token).then((data) => {
            users.findOne({ email: data.user.email }, (err, user) => {
                if (err) {
                    reject(new Error('Error: update profile'));
                } else {
                    if (user) {
                        user.information.university = body.information.university;
                        user.information.birthday.date = body.information.birthday.date;
                        user.information.birthday.month = body.information.birthday.month;
                        user.information.birthday.year = body.information.birthday.year;
                        user.information.address.city = body.information.address.city;
                        user.information.address.country = body.information.address.country;
                        user.save((err, result) => {
                            if (err) {
                                reject(new Error('Error: update profile'));
                            } else {
                                if (result) {
                                    resolve({
                                        code: 200,
                                        data: result
                                    });
                                } else {
                                    resolve({
                                        code: 421
                                    })
                                }
                            }
                        })
                    } else {
                        resolve({
                            code: 404
                        })
                    }
                }
            })
        }).catch((err) => {
            console.log(err);
            reject(new Error('Something went Error...'));
        })
    })
}

function confirmEmail(_token) {
    return new Promise((resolve, reject) => {
        token.verify(_token).then((data) => {
            users.findOne({ email: data.email }, (err, result) => {
                if (err) {
                    reject(new Error('Error: confirm email'));
                } else {
                    if (result) {
                        result.isConfirmbyEmail = true;
                        result.save((err, newUser) => {
                            if (err) {
                                console.log(err);
                                reject(new Error('Error: confirm email'));
                            } else {
                                if (newUser) {
                                    resolve({
                                        code: 200,
                                        data: newUser
                                    })
                                } else {
                                    resolve({
                                        code: 421
                                    })
                                }
                            }
                        });
                    } else {
                        resolve({
                            code: 404
                        })
                    }
                }
            });
        }).catch((err) => {
            console.log(err);
            reject(new Error('Somthing went Error!'));
        })
    });
}

function changeAvatar(body) {
    return new Promise((resolve, reject) => {
        token.verify(body.token).then((data) => {
            users.findOne({ email: data.user.email }, (err, user) => {
                if (err) {
                    console.log(err);
                    reject(new Error('Error: change avatar'));
                } else {
                    if (user) {
                        user.srcAvatar = body.srcAvatar;
                        user.save((err, result) => {
                            if (err) {
                                console.log(err);
                                reject(new Error('Error: change avatar'));
                            } else {
                                if (result) {
                                    resolve({
                                        code: 200,
                                        data: result
                                    })
                                } else {
                                    resolve({
                                        code: 421
                                    })
                                }
                            }
                        })
                    } else {
                        resolve({
                            code: 404
                        })
                    }

                }
            })
        }).catch((err) => {
            console.log(err + '');
            reject(new Error('Something went Error...'));
        })
    });
}

function changePassword(body) {
    return new Promise((resolve, reject) => {
        token.verify(body.token).then((data) => {
            users.findOne({ email: data.user.email }, (err, user) => {
                if (err) {
                    console.log(err);
                    reject(new Error('Error: change password'));
                } else {
                    if (user) {
                        if (user.emailCode == body.emailCode) {
                            user.password = body.password;
                            user.save((error, result) => {
                                if (error) {
                                    console.log(error);
                                    reject(new Error('Something went error'));
                                } else {
                                    if (result) {
                                        resolve(result);
                                    } else {
                                        console.log('Something went error!')
                                    }
                                }
                            })
                        } else {
                            resolve({ result: false });
                        }
                    } else {
                        console.log('Something went error')
                    }

                }
            })
        })
    })
}

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
                                resolve(result);
                            }
                        })
                    } else {
                        resolve({ result: false });
                    }
                } else {
                    console.log('Something went error')
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
                            information: user.information,
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
    updateProfile,
    confirmEmail,
    changeAvatar,
    changePassword,
    forgotPassword,
    setEmailCode,
    getInfoUserByUserID
}