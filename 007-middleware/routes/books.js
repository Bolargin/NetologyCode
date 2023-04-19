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
        new Book("Название 1", "Описание 1", "Автор 1", "0","001", "001.txt", "001.txt"),
        new Book("Название 2", "Описание 2", "Автор 2", "1", "002", "002.txt", "002.txt")
    ],
};

router.get("/", (req, res) => { //получить все книги | получаем массив всех книг
    const {book} =library
    res.json(book)
})
module.exports = router


router.get('/:id', (req, res) => {//получить книгу по **id** | получаем объект книги, если запись не найдена, вернём **Code: 404** 
    const {book} = library
    const {id} = req.params
    const indx = book.findIndex(el => el.id === id)
    if( indx !== -1){
        res.json(book[indx])
    }else{
        res.status(404)
        res.json({errcode:404, error: "Not found"});
    }
})

router.post('/', (req, res) => {//создать книгу | создаём книгу и возвращаем её же вместе с присвоенным **id**
    const {book} = library
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = {...req.body}

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)
    book.push(newBook)

    res.status(201)
    res.json(newBook)
})

router.put('/:id', (req, res) => { //редактировать книгу по **id** | редактируем объект книги, если запись не найдена, вернём **Code: 404**
    const {book} = library
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = {...req.body}
    const {id} = req.params
    const indx = book.findIndex(el => el.id === id)

    if (indx !== -1){
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
        res.json(book[indx])
    }else{
        res.status(404)
        res.json({errcode:404, error: "Not found"});
    }
})

router.delete('/:id', (req, res) => { //удалить книгу по **id** | удаляем книгу и возвращаем ответ: **'ok'**
    const {book} = library
    const {id} = req.params
    const indx = book.findIndex(el => el.id === id)
     
    if(indx !== -1){
        book.splice(indx, 1)
        res.json('ok')
    } else {
        res.status(404)
        res.json({errcode:404, error: "Not found"});
    }
})

router.get('/:id/download', (req, res) => { //отдать на скачиваение файл книги по её **:id**
    const {book} = library
    const {id} = req.params
    const indx = book.findIndex(el => el.id === id)
    console.log(__dirname + "\\public\\books\\"+ book[indx].fileBook)
    if( indx !== -1){
        express.static(__dirname + "\\public\\books\\"+ book[indx].fileBook)
    }else{
        res.status(404)
        res.json({errcode:404, error: "Not found"});
    }
})

router.post('/upload', fileMulter.single('004.txt'), (req, res) => {
        if(req.file){
            const {path} = req.file
            res.json({path})
        }
        res.json()
    })

module.exports = router