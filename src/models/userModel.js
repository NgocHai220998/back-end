const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const token = require('../constants/token.js');

const userSchema = new Schema({
    emailCode: Number,
    password: String,
    userID: String,
    email: String,
    profile: {
        rank: Number,
        famePoint: {
            type: Number,
            default: 2000
        }
    },
    isConfirmbyEmail: {
        type: Boolean,
        default: false
    },
    isCreateMain: {
        type: Boolean,
        default: false
    },
    main: {
        userName: String,
        kind: String,
        martialArt: Number,
        magic: Number,
        skill: Number,
        avoid: Number,
        propUp: Number,
        exactly: Number,
        critical: Number,
        hp: Number,
        position: {
            type: Number,
            default: 2
        },
        srcImage: String
    },
    pets: [{
        userName: String,
        kind: String,
        martialArt: Number,
        magic: Number,
        skill: Number,
        avoid: Number,
        propUp: Number,
        exactly: Number,
        critical: Number,
        hp: Number,
        position: {
            type: Number,
            default: -1
        },
        srcImage: String
    }]
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
                resolve({
                    code: 404
                  })
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
                resolve({
                    code: 404
                  })
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
                    resolve({
                        code: 404
                      })
                    reject(new Error('Error: confirm email'));
                } else {
                    if (result) {
                        result.isConfirmbyEmail = true; // to confirm
                        result.save((err, newUser) => {
                            if (err) {
                                resolve({
                                code: 404
                                })
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
            resolve({
                code: 404
            })
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
                resolve({
                    code: 404
                  })
                reject(new Error('Something went error'));
            } else {
                if (user) {
                    if (user.emailCode == body.emailCode) {
                        user.password = body.password;
                        user.save((error, result) => {
                            if (error) {
                                resolve({
                                    code: 404
                                  })
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

/**
 * @function: send a code to check user
 * @param : data 
 */
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

/**
 * @function: get info an user by UserID
 * @param: userID 
 */
function getInfoUserByEmail(email) {
    return new Promise((resolve, reject) => {
        users.findOne({ userID: email }, (err, user) => {
            if (err) {
                resolve({
                    code: 404
                  })
                reject(new Error('Error: get info user by userID'));
            } else {
                if (user) {
                    resolve({
                        code: 200,
                        data: {
                            email: newUser.email,
                            main: newUser.main,
                            pets: newUser.pets,
                            userID: newUser.userID
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

/**
 * @function: create main to first login 
 * @param: data 
 */
function createMain(data) {
    return new Promise((resolve, reject) => {
        token.verify(data.token).then((res) => {
            users.findOne({ email: res.user.email }, (err, result) => {
                if (err) {
                    resolve({
                        code: 404
                      })
                    reject(new Error('err: createMain'))
                } else {
                    if (result) { // Tim thay user
                        result.isCreateMain = true
                        result.main = {
                            ...result.main,
                            ...data.main
                        }
                        result.save((error, newUser) => {
                            if (error) {
                                resolve({
                                    code: 404
                                  })
                                reject(new Error('Err Create Main save'))
                            } else if (newUser) {
                                resolve({
                                    code: 200,
                                    data: {
                                        email: newUser.email,
                                        userID: newUser.userID,
                                        main: newUser.main,
                                        pets: newUser.pets,
                                        token: data.token
                                    }
                                })
                            } else {
                                resolve({
                                    code: 403 // Error cant not save user
                                })
                            }
                        })
                    } else {
                        resolve({
                            code: 404 // Khong tim thay user
                        })
                    }
                }
            })
        })
    })
}

/**
 * 
 * @param : data 
 */
function updatePosition (data) {
    return new Promise((resolve, reject) => {
        token.verify(data.token).then((dataToken) => {
            users.findOne({ email: dataToken.user.email }, (err, result) => {
                if (err) {
                    resolve({
                        code: 404
                      })
                    reject(new Error('Somthing err in Update position'))
                } else if (result) {
                    result.main.position = data.main.position
                    if (result.pets && data.pets) {
                        for (let i = 0; i < result.pets.length; ++i) {
                            for (let j = 0; j < data.pets.length; ++j) {
                                if (data.pets[j].kind === result.pets[i].kind) {
                                    result.pets[i].position = data.pets[j].position
                                }
                            }
                        }
                    }
                    result.save((err, res) => {
                        if (err) {
                            resolve({
                                code: 404
                              })
                            reject(new Error('err save in updataPosition'))
                        } else if (res) {
                            resolve({
                                code: 200,
                                main: res.main,
                                pets: res.pets
                            })
                        } else {
                            resolve({
                                code: 404
                            })
                        }
                    })
                } else {
                    resolve({
                        code: 404
                    })
                }
            })
        })
    })
}


/**
 * 
 */
function getUserByEmail (email) {
    return new Promise((resolve, reject) => {
        users.findOne({ email, email }, (err, data) => {
            if (err) {
                resolve({
                    code: 404
                  })
                reject(new Error('somthing err in getUserByEmail'))
            } else {
                if (data) {
                    resolve({
                        code: 200,
                        user: {
                            main: data.main,
                            pets: data.pets,
                            email: data.email,
                            profile: data.profile
                        }
                    })
                } else {
                    resolve({
                        code: 404 // Khong tim thay user nao
                    })
                }
            }
        })
    })
}


function updateProfile (data) {
    return new Promise((resolve, reject) => {
        token.verify(data.token).then((dataToken) => {
            if (dataToken) {
                users.findOne({ email: res.user.email }, (err, user) => {
                    if (err) {
                        resolve({
                            code: 404,
                            message: 'User not found'
                        })
                    } else if (user) {
                        user.profile = {
                            ...user.profile,
                            ...data.data
                        }
                        user.save((err, updatedUser) => {
                            if (err) {
                                resolve({
                                    code: 404,
                                    message: 'user save is err'
                                })
                            } else if (updatedUser) {
                                resolve({
                                    code: 200,
                                    message: 'Update profile success!'
                                })
                            } else {
                                resolve({
                                    code: 404,
                                    message: 'user save is err'
                                })
                            }
                        })
                    } else {
                        resolve({
                            code: 404,
                            message: 'User err'
                        })
                    }
                })
            } else {
                resolve({
                    code: 404,
                    message: 'Token err'
                })
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
    getInfoUserByEmail,
    createMain,
    updatePosition,
    getUserByEmail,
    updateProfile
}