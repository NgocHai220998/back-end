const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const token = require('../constants/token.js');

const badWordSchema = new Schema({
  email: String,
  badWord: String,
  explain: String
})

const badWords = mongoose.model('badWord', badWordSchema);

/**
 * @function: Create a new badWord for user 
 * @param: body 
 */
function createBadWord(body) {
  return new Promise((resolve, reject) => {
    token.verify(body.token).then((res) => {
      if (res) {
        const newBadWord = {
          email: res.user.email,
          ...body.data
        }
        badWords.create(newBadWord, (err, result) => {
          if (err) {
            resolve({
              code: 404
            })
            reject(new Error('Can not save badWord in Create badWord'))
          } else {
            resolve({
              code: 200,
              badWord: result
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

/**
 * @function: delete one badWord 
 * @param : body 
 */
function deleteBadWord (_id) {
  return new Promise((resolve, reject) => {
    badWords.deleteOne({ _id: _id }, (err, result) => {
      if (err) {
        resolve({
          code: 404
        })
        reject(new Error('Can not delete in delete badWord'))
      } else {
        resolve({
          code: 200
        })
      }
    })
  })
}


/**
 * @function: update badWord
 * @param: body 
 */
function updateBadWord (body, _id) {
  return new Promise((resolve, reject) => {
    badWords.findOne({ _id: _id }, (err, badWord) => {
      if (err) {
        resolve({
          code: 404
        })
        reject(new Error('not found badWord in updatebadWord'))
      } else {
        if (badWord) {
          badWord.badWord = body.data.badWord
          badWord.explain = body.data.explain
          badWord.save((err, newBadWord) => {
            if (err) {
              resolve({
                code: 404
              })
              reject(new Error('can not save in updatebadWord'))
            } else {
              resolve({
                code: 200,
                badWord: newBadWord
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
  })
}


function getBadWords (email) {
  return new Promise((resolve, reject) => {
    badWords.find({ email: email}, (err, newBadWords) => {
      if (err) {
        resolve({
          code: 404
        })
        reject(new Error('Somethings wrong in getbadWords'))
      } else {
        resolve({
          code: 200,
          badWords: newBadWords
        })
      }
    })
  })
}



module.exports = {
  badWords,
  getBadWords,
  updateBadWord,
  deleteBadWord,
  createBadWord
}