const mongoose = require('mongoose');
const users = require('../models/userModel.js');
const Schema = mongoose.Schema;

const rankSchema = new Schema({
  name: {
    type: String,
    default: 'hainn'
  },
  listRank: [{
    userName: String,
    email: String,
    rank: Number
  }]
})

const ranks = mongoose.model('rank', rankSchema);

function setRankUser (user, rank) {
  return new Promise((resolve, reject) => {
    users.users.findOne({ email: user.email }, (err, userData) => {
      if (err) {
        resolve({
          code: 404
        })
      } else if (userData) {
        userData.profile.rank = rank
        userData.save((err, newUser) => {
          if (err) {
            resolve({
              code: 404
            })
          } else if (newUser) {
            resolve({
              code: 200,
              user: newUser
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
}


function addNewUser (user) {
  return new Promise((resolve, reject) => {
    ranks.find((err, res) => {
      if (err) {
        resolve({
          code: 404
        })
        reject(new Error('Err add new user in rankModel'))
      } else {
        if (res[0]) {
          ranks.findOne({ name: 'hainn' }, (err, rank) => {
            if (err) {
              resolve({
                code: 404
              })
              reject(new Error('err create a new rank in addNewRank'))
            } else {
              if (rank) {
                setRankUser(user, rank.listRank.length + 1).then((result) => {
                  rank.listRank.push({
                    ...user,
                    rank: rank.listRank.length + 1
                  })
                  rank.save((err, newResult) => {
                    resolve({
                      code: 200,
                      rank: newResult
                    })
                  })
                })
              } else {
                resolve({
                  code: 404
                })
              }
            }
          })
        } else if (!res[0] && user !== undefined) {
          const newRank = {
            name: 'hainn',
            listRank: []
          }
          ranks.create(newRank, (err, data) => {
            if (err) {
              resolve({
                code: 404
              })
              reject(new Error('err create a new rank in addNewRank'))
            } else {
              ranks.findOne({ name: 'hainn' }, (err, rank) => {
                if (err) {
                  resolve({
                    code: 404
                  })
                  reject(new Error('err create a new rank in addNewRank'))
                } else {
                  if (rank) {
                    setRankUser(user, 1).then((result) => {
                      user.rank = 1
                      rank.listRank.push(user)
                      rank.save((err, newResult) => {
                        if (err) {
                          resolve({
                            code: 404
                          })
                          reject(new Error('err'))
                        } else {
                          resolve({
                            code: 200,
                            rank: newResult
                          })
                        }
                      })
                    })
                  } else {
                    resolve({
                      code: 404
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  })
}

function getRanks () {
  return new Promise((resolve, reject) => {
    ranks.findOne({ name: 'hainn' }, (err, res) => {
      if (err) {
        resolve({
          code: 404
        })
        reject(new Error('Err add new user in rankModel'))
      } else if (res) {
        resolve({
          code: 200,
          rank: res
        })
      } else {
        resolve({
          code: 404
        })
      }
    })
  })
}

module.exports = {
  ranks,
  addNewUser,
  getRanks
}