const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const token = require('../constants/token.js');

const exampleSchema = new Schema({
  email: String,
  example: String,
  explain: String
})

const examples = mongoose.model('example', exampleSchema);

/**
 * @function: Create a new example for user 
 * @param: body 
 */
function createExample(body) {
  return new Promise((resolve, reject) => {
    token.verify(body.token).then((res) => {
      const newExample = {
        email: res.user.email,
        ...body.data
      }
      examples.create(newExample, (err, result) => {
        if (err) {
          reject(new Error('Can not save example in Create example'))
        } else {
          resolve({
            code: 200,
            example: result
          })
        }
      })
    })
  })
}

/**
 * @function: delete one example 
 * @param : body 
 */
function deleteExample (_id) {
  return new Promise((resolve, reject) => {
    examples.deleteOne({ _id: _id }, (err, result) => {
      if (err) {
        reject(new Error('Can not delete in delete example'))
      } else {
        resolve({
          code: 200
        })
      }
    })
  })
}


/**
 * @function: update example
 * @param: body 
 */
function updateExample (body, _id) {
  return new Promise((resolve, reject) => {
    examples.findOne({ _id: _id }, (err, example) => {
      if (err) {
        reject(new Error('not found example in updateexample'))
      } else {
        example.example = body.data.example
        example.explain = body.data.explain
        example.save((err, newExample) => {
          if (err) {
            reject(new Error('can not save in updateexample'))
          } else {
            resolve({
              code: 200,
              example: newExample
            })
          }
        })
      }
    })
  })
}


function getExamples (email) {
  return new Promise((resolve, reject) => {
    examples.find({ email: email}, (err, newExamples) => {
      if (err) {
        reject(new Error('Somethings wrong in getexamples'))
      } else {
        resolve({
          code: 200,
          examples: newExamples
        })
      }
    })
  })
}



module.exports = {
  examples,
  getExamples,
  updateExample,
  deleteExample,
  createExample
}