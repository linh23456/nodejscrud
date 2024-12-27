const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    books : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Book'
        },
    ],
},
{timestamps: true}
);

let Author = mongoose.model('Author' , authorSchema);

module.exports = {
    Author
};