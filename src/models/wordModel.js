const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const token = require('../constants/token.js');

const wordSchema = new Schema({
  email: String,
  vocabulary: String,
  explain: String,
  example1: String,
  example2: String,
  example3: String,
  example4: String,
  description: String
})

const words = mongoose.model('word', wordSchema);

/**
 * @function: Create a new word for user 
 * @param: body 
 */
function createWord(body) {
  return new Promise((resolve, reject) => {
    token.verify(body.token).then((res) => {
      const newWord = {
        email: res.user.email,
        ...body.data
      }
      words.create(newWord, (err, result) => {
        if (err) {
          reject(new Error('Can not save word in Create Word'))
        } else {
          resolve({
            code: 200,
            word: result
          })
        }
      })
    })
  })
}

/**
 * @function: delete one word 
 * @param : body 
 */
function deleteWord (_id) {
  return new Promise((resolve, reject) => {
    words.deleteOne({ _id: _id }, (err, result) => {
      if (err) {
        reject(new Error('Can not delete in delete Word'))
      } else {
        resolve({
          code: 200
        })
      }
    })
  })
}


/**
 * @function: update Word
 * @param: body 
 */
function updateWord (body, _id) {
  return new Promise((resolve, reject) => {
    words.findOne({ _id: _id }, (err, word) => {
      if (err) {
        reject(new Error('not found word in updateWord'))
      } else {
        word.vocabulary = body.data.vocabulary
        word.explain = body.data.explain
        word.description = body.data.description
        word.example1 = body.data.example1
        word.example2 = body.data.example2
        word.example3 = body.data.example3
        word.example4 = body.data.example4
        word.save((err, newWord) => {
          if (err) {
            reject(new Error('can not save in updateWord'))
          } else {
            resolve({
              code: 200,
              word: newWord
            })
          }
        })
      }
    })
  })
}


function getWords (email) {
  return new Promise((resolve, reject) => {
    words.find({ email: email}, (err, newWords) => {
      if (err) {
        reject(new Error('Somethings wrong in getWords'))
      } else {
        resolve({
          code: 200,
          words: newWords
        })
      }
    })
  })
}



module.exports = {
  words,
  getWords,
  updateWord,
  deleteWord,
  createWord
}