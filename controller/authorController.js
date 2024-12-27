const {Author} = require("../model/author");
const {Book} = require("../model/book");

const authorController = {
    addAuthor: async(req , res) => {
        try{
            const newAuthor = new Author(req.body);
            const savedAuthor = await newAuthor.save();
            res.status(201).json(savedAuthor);
        }catch(err){
            res.status(500).json(err);
        }
    },

    getAuthors: async(req , res) => {
        try{
            const authors = await Author.find();
            res.status(200).json(authors);
        }catch(err){
            res.status(500).json(err);
        }
    },

    getAnAuthor: async(req , res) =>{
        try{
            const authors = await Author.findById(req.params.id).populate("books");
            res.status(200).json(authors , {"message": "Got an author"});
        }catch(err){
            res.status(500).json(err);
        }
    },

    updateAuthor : async(req, res) => {
        try {
            await Author.findByIdAndUpdate(req.params.id);
            await Author.updateOne({$set : req.body});
            res.status(200).json("Update successful");
        } catch(err) {
            res.status(500).json(err);
        }
    },
    

    deleteAuthor : async(req, res) => {
        try{
            await Book.updateMany(
                {author : req.params.id},
                {author:null} 
            );
            await Author.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete success");
        }catch(err){
            res.status(500).json(err);
        }
    },
};

module.exports = authorController;