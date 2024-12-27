
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    publishedDate : {
        type: String,
        required : true
    },
    genres : {
        type : [String],
        required : true
    },
    author : {
        
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Author',
        
    },
},
{timestamps : true}
);

let Book = mongoose.model('Book', bookSchema);
module.exports = {Book};