const { v4: uuid } = require('uuid')
const fileMulter = require('../middleware/file.js')
const express = require('express')
const router = express.Router()

class Book {
    constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", fileBook = "", id = uuid()) {
		this.title = title
		this.description = description
		this.authors = authors
		this.favorite = favorite
		this.fileCover = fileCover
		this.fileName = fileName
        this.fileBook = fileBook
        this.id = id
    }
}
const library = {
    book: [
        new Book("Название 1", "Описание 1", "Автор 1", "Нет","001", "001.txt", 'public\\books\\001.txt'),
        new Book("Название 2", "Описание 2", "Автор 2", "Да", "002", "002.txt", 'public\\books\\002.txt')
    ],
};

router.get("/", (req, res) => { //получить все книги | получаем массив всех книг
    const {book} = library
    res.render('books/index', {
        title: 'Все книги',
        books: book
    })
})

router.get("/create", (req, res) => { //получить все книги | получаем массив всех книг
    res.render('books/create', {
        title: 'Все книги',
        books: {}
    })
})


router.get('/:id', (req, res) => {//получить книгу по **id** | получаем объект книги, если запись не найдена, вернём **Code: 404** 
    const {book} = library
    const {id} = req.params
    const indx = book.findIndex(el => el.id === id)
    if( indx === -1){
        res.redirect('/404')
    }
    res.render("books/view", {
        title: "Просмотр книги",
        books: book[indx]
    })
})

router.post('/create', (req, res) => {//создать книгу | создаём книгу и возвращаем её же вместе с присвоенным **id**
    const {book} = library
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)
    book.push(newBook)
    res.redirect('/books')
})

router.get('/update/:id', (req, res) => {
    const {book} = library
    const {id} = req.params
    const indx = book.findIndex(el => el.id === id)
    if (indx === -1) {
        res.redirect('/404');
    }
    res.render("books/update", {
        title: "Редактирование",
        books: book[indx],
    })
})

router.post('/update/:id', (req, res) => { //редактировать книгу по **id** | редактируем объект книги, если запись не найдена, вернём **Code: 404**
    const {book} = library
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = {...req.body}
    const {id} = req.params
    const indx = book.findIndex(el => el.id === id)
    if( indx === -1){
        res.redirect('/404')
    }
    book[indx] = {
        ...book[indx],
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
    }
    res.redirect(`/books/${id}`);
})

router.post('/delete/:id', (req, res) => { //удалить книгу по **id** | удаляем книгу и возвращаем ответ: **'ok'**
    const {book} = library
    const {id} = req.params
    const indx = book.findIndex(el => el.id === id)
    if (indx === -1) {
        res.redirect('/404');
    }
    book.splice(indx, 1);
    res.redirect(`/books`);
})

router.get('/download/:id', (req, res) => { //отдать на скачиваение файл книги по её **:id**
    const {book} = library
    const {id} = req.params
    const indx = book.findIndex(el => el.id === id)
    if (indx === -1) {
        res.redirect('/404');
    }
    const file = `${__dirname}/../${book[indx].fileBook}`
    res.download(file);
})

router.get('/upload/:id', (req, res) => {
    const {book} = library
    const {id} = req.params
    const indx = book.findIndex(el => el.id === id)
    if (indx === -1) {
        res.redirect('/404');
    }
    res.render("books/upload", {
        title: "Загрузка книги",
        books: book[indx],
    })
})

router.post('/upload/:id', fileMulter.single("filedata"), (req, res) => {
    const {book} = library
    const {id} = req.params
    const indx = book.findIndex(el => el.id === id)
    if (indx === -1) {
        res.redirect('/404');
    }
        book[indx].fileBook = req.file.path
        res.redirect('/books')
})

module.exports = router