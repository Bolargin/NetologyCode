const express = require('express')
const { v4: uuid } = require('uuid')
class User {
    constructor(id = uuid() , mail = "") {
        this.id = id
		this.mail = mail
    }
}
class Book {
    constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", id = uuid()) {
		this.title = title
		this.description = description
		this.authors = authors
		this.favorite = favorite
		this.fileCover = fileCover
		this.fileName = fileName
        this.id = id
    }
}
const library = {
    book: [
        new Book("Название 1", "Описание 1", "Автор 1", "0","001", "001.pdf"),
        new Book("Название 2", "Описание 2", "Автор 2", "1", "002", "002.pdf")
    ],
};
const app = express()
app.use(express.json())

app.post('/api/user/login', (req, res) => {//авторизация пользователя | метод всегда возвращает **Code: 201** и статичный объект: `{ id: 1, mail: "test@mail.ru" }`
    res.status(201)
    const user = new User(1, "test@mail.ru")
    res.json(user)
})

app.get('/api/books', (req, res) => {//получить все книги | получаем массив всех книг
    const {book} =library
    res.json(book)

})

app.get('/api/books/:id', (req, res) => {//получить книгу по **id** | получаем объект книги, если запись не найдена, вернём **Code: 404** 
    const {book} = library
    const {id} = req.params
    const indx = book.findIndex(el => el.id === id)
    if( indx !== -1){
        res.json(book[indx])
    }else{
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

app.post('/api/books/', (req, res) => {//создать книгу | создаём книгу и возвращаем её же вместе с присвоенным **id**
    const {book} = library
    const {title, description, authors, favorite, fileCover, fileName} = req.body

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
    book.push(newBook)

    res.status(201)
    res.json(newBook)
})

app.put('/api/books/:id', (req, res) => { //редактировать книгу по **id** | редактируем объект книги, если запись не найдена, вернём **Code: 404**
    const {book} = library
    const {title, description, authors, favorite, fileCover, fileName} = req.body
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
            fileName
        }
        res.json(book[indx])
    }else{
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

app.delete('/api/books/:id', (req, res) => {//удалить книгу по **id** | удаляем книгу и возвращаем ответ: **'ok'**
    const {book} = library
    const {id} = req.params
    const indx = book.findIndex(el => el.id === id)
     
    if(indx !== -1){
        book.splice(indx, 1)
        res.json('ok')
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT)