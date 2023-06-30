const http = require('node:http')
const { v4: uuid } = require('uuid')
const fileMulter = require('../middleware/file.js')
const express = require('express')
const router = express.Router()
const BookDB = require('../models/bookdb.js')

router.get("/", async (req, res) => { //получить все книги | получаем массив всех книг
    try{
        const books = await BookDB.find().select('-__v')
        res.render('books/index', {
                title: 'Все книги',
                books: books
            })
    }catch(e){res.status(500).json({ errmsg: 'Ошибка 01:', err: e })}
})

router.get("/create", (req, res) => {
    res.render('books/create', {
        title: 'Создание книги',
        books: []
    })
})

router.get('/:id', async (req, res) => {//получить книгу по **id** | получаем объект книги, если запись не найдена, вернём **Code: 404** 
    const {id} = req.params
    try{
        const book = await BookDB.findById(id).select('-__v')
        if( !book ){
            res.redirect('/404')
        }
        let response = await fetch(`http://counter:3001/counter/${id}/incr`, {method: 'POST'})
        response = await fetch(`http://counter:3001/counter/${id}`)
        res.render("books/view", {
            title: "Просмотр книги",
            books: book,
            count: await response.text()
        })
    }catch(e){res.status(500).json({ errmsg: 'Ошибка 02:', err: e })}
})

router.post('/create', async(req, res) => {//создать книгу | создаём книгу и возвращаем её же вместе с присвоенным **id**
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = {...req.body}
    try{
        await BookDB.create({title, description, authors, favorite, fileCover, fileName, fileBook})
        res.redirect('/books')
    }catch(e){res.status(500).json({ errmsg: 'Ошибка 03:', err: e })}
})

router.get('/update/:id', async(req, res) => {
    const {id} = req.params
    try{
        const book = await BookDB.findById(id).select('-__v')
        if (!book) {
            res.redirect('/404')
        }
        res.render("books/update", {
            title: "Редактирование",
            books: book,
        })
    }catch(e){res.status(500).json({ errmsg: 'Ошибка 04:', err: e })}
})

router.post('/update/:id', async(req, res) => { //редактировать книгу по **id** | редактируем объект книги, если запись не найдена, вернём **Code: 404**
    const {id} = req.params
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = {...req.body}
    try{        
        const book = await BookDB.findByIdAndUpdate(id, {title, description, authors, favorite, fileCover, fileName, fileBook})
        if(!book){
            res.redirect('/404')
        }
        res.redirect(`/books/${id}`)
    }catch(e){res.status(500).json({ errmsg: 'Ошибка 05:', err: e })}
})

router.post('/delete/:id', async(req, res) => { //удалить книгу по **id** | удаляем книгу и возвращаем ответ: **'ok'**
    const {id} = req.params
    try{
        await BookDB.deleteOne({_id: id})
        res.redirect(`/books`)
    }catch(e){res.status(500).json({ errmsg: 'Ошибка 06:', err: e })}
})

router.get('/download/:id', async(req, res) => { //отдать на скачиваение файл книги по её **:id**
    const {id} = req.params
    try{
        const book = await BookDB.findById(id).select('-__v')
        if (!book) {
            res.redirect('/404')
        }
        const file = `${__dirname}/../../${book.fileCover}`
        res.download(file)
    }catch(e){res.status(500).json({ errmsg: 'Ошибка 07:', err: e })}
})

router.get('/upload/:id', async(req, res) => {
    const {id} = req.params
    try{
        const book = await BookDB.findById(id).select('-__v')
        if (!book) {
            res.redirect('/404')
        }
        res.render("books/upload", {
            title: "Загрузка книги",
            books: book,
        })
    }catch(e){res.status(500).json({ errmsg: 'Ошибка 07:', err: e })}
})

router.post('/upload/:id', fileMulter.single("filedata"), async(req, res) => {
    const {id} = req.params
    try{        
        const book = await BookDB.findByIdAndUpdate(id, {fileCover: req.file.path})
        if(!book){
            res.redirect('/404')
        }
        res.redirect(`/books/${id}`)
    }catch(e){res.status(500).json({ errmsg: 'Ошибка 09:', err: e })}
})

module.exports = router