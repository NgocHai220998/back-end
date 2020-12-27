let configDatabase = require('../config/configDatabase.json');
const url = 'mongodb://localhost:27017'
let mongoose = require("mongoose");
// console.log(process.env.NODE_ENV)

module.exports = () => {
    if (process.env.NODE_ENV === 'production') {
        mongoose.connect(`mongodb+srv://hainn:ngochai220998@cluster0.vjptx.mongodb.net/Cluster0?retryWrites=true&w=majority`);
        
    } else {
        mongoose.connect(`mongodb+srv://hainn:ngochai220998@cluster0.vjptx.mongodb.net/Cluster0?retryWrites=true&w=majority`);
    }
}

