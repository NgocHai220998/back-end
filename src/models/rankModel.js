const mongoose = require('mongoose');
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
                rank.listRank.push({
                  ...user,
                  rank: rank.listRank.length + 1
                })
                rank.save((err, result) => {
                  resolve({
                    code: 200,
                    rank: result
                  })
                })
              } else {
                resolve({
                  code: 404
                })
              }
            }
          })
        } else {
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
                    user.rank = 1
                    rank.listRank.push(user)
                    rank.save((err, result) => {
                      if (err) {
                        resolve({
                          code: 404
                        })
                        reject(new Error('err'))
                      } else {
                        resolve({
                          code: 200,
                          rank: result
                        })
                      }
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
      } else {
        resolve({
          code: 200,
          rank: res
        })
      }
    })
  })
}

addNewUser()


module.exports = {
  ranks,
  addNewUser,
  getRanks
}