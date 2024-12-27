const {Book } = require("../model/book");
const {Author} = require("../model/author");

const bookController = {
    addBook : async(req, res) =>{
        const book = new Book(req.body);
        const savedBook = await book.save();
        if(req.body.author){
            const author = Author.findById(req.body.author);
            await author.updateOne({$push: {books: savedBook._id}});
        }
        res.status(200).json(savedBook);
    },

    getBook : async(req , res) => {
        try{
            const books = await Book.find();
            res.status(200).json(books);
        }catch(err){
            res.status(500).json(err);
        }
    },

    getABook : async(req , res) =>{
        try{
            const books = await Book.findById(req.params.id).populate("author");
            res.status(200).json(books);
        }catch(err){
            res.status(500).json(err);
        }
    },

    updateBook : async(req, res) => {
        try{
            const book = await Book.findById(req.params.id);
            book.updateOne({$set : req.body});
            res.status(200).json("Update success");
        }catch(err){
            res.status(500).json(err);
        }
    },

    deleteBook : async(req, res) => {
        try{
            await Author.updateMany(
                {books : req.params.id},
                {$pull : {books : req.params.id}}
            );
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete success");
        }catch(err){
            res.status(500).json(err);
        }
    }
}

module.exports = bookController;