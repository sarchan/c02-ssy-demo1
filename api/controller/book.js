const express = require('express')
const router = express.Router()

const db = require('../model/database-book')
const Book = require('../model/book')

//GET http://localhost:3000/books
router.get('/', getBookList)

function getBookList(req, res) {
    const bookCollection = db.getCollection('books')
    const books = bookCollection.find() //zeigt alles in collection an

    const results = []

    res.json(books)

    // for (let book of books){
    //     results.push({
    //         isbn: book.isbn,
    //
    //     })
    // }

}
//POST http://localhost:3000/books
router.post('/', newBook)

function newBook(req, res){
    const isbn = req.body.isbn
    const author = req.body.author
    const title = req.body.title
    const price = req.body.price

    const book = new Book(isbn,author,title,price)
    const bookCollection = db.getCollection('books')
    bookCollection.insert(book)

    res.json(book)
}

module.exports = router

