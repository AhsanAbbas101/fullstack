
const DataLoader = require('dataloader')
const Book = require('./book/model')
const mongoose = require('mongoose');
const _ = require('lodash')

const BooksCountLoader = new DataLoader(authorIds => {
    return Book.aggregate([
    {
        $match: {
        author: { $in: authorIds.map(id => new mongoose.Types.ObjectId(id)) }, 
        },
    },
    {
        $group: {
        _id: "$author", // Group by the `author` field
        bookCount: { $sum: 1 }, // Count the number of books per author
        },
    },
    {
        $project: {
        _id: 1,
        bookCount: 1, 
        },
    },
    ]).then(authors => {        
        const authorsById = _.keyBy(authors, "_id");
        const ordered = authorIds.map(authorId => authorsById[authorId]);
        return result = ordered.map(a => a ? a.bookCount : 0)
    })
})

module.exports = {BooksCountLoader}