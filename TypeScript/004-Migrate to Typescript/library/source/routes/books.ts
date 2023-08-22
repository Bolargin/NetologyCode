import * as http from 'http';
import {v1 as uuid} from "uuid"; 
import fileMulter from "../middleware/file";
import BookDB from "../models/books.db";
import {bookContainer} from "../conteiner";
import { BooksService,} from "../models/books.service";
import {Router} from 'express';

const router = Router();


router.get("/", async (req, res) => { 
    try{
        const service: BooksService = bookContainer.get(BooksService);
        const books = await service.getBooks();
        res.render('books/index', {
          title: 'Все книги',
          books: books
        });
      }catch(e){res.status(500).json({ errmsg: 'Ошибка 01:', err: e })}
})

router.get("/create", (req, res) => {
    res.render('books/create', {
        title: 'Создание книги',
        books: []
    });
});

router.get('/:id', async (req, res) => {//получить книгу по **id** | получаем объект книги, если запись не найдена, вернём **Code: 404** 
    const {id} = req.params;
    try{
        const service: BooksService = bookContainer.get(BooksService);
        const book = await service.getBook(id);
        if( !book ){
            res.redirect('/404');
        }
        let response = await fetch(`http://counter:3001/counter/${id}/incr`, {method: 'POST'});
        response = await fetch(`http://counter:3001/counter/${id}`);
        res.render("books/view", {
            title: "Просмотр книги",
            books: book,
            count: await response.text()
        });
    }catch(e){res.status(500).json({ errmsg: 'Ошибка 02:', err: e })}
});

router.post('/create', async(req, res) => {//создать книгу | создаём книгу и возвращаем её же вместе с присвоенным **id**
    try{
        const service: BooksService = bookContainer.get(BooksService);
        await service.createBook(req.body);
        res.redirect('/books');
    }catch(e){res.status(500).json({ errmsg: 'Ошибка 03:', err: e })}
});

router.get('/update/:id', async(req, res) => {
    const {id} = req.params;
    try{
        const service: BooksService = bookContainer.get(BooksService);
        const book = await service.getBook(id);
        if (!book) {
            res.redirect('/404');
        }
        res.render("books/update", {
            title: "Редактирование",
            books: book,
        });
    }catch(e){res.status(500).json({ errmsg: 'Ошибка 04:', err: e })}
});

router.post('/update/:id', async(req, res) => { //редактировать книгу по **id** | редактируем объект книги, если запись не найдена, вернём **Code: 404**
    const {id} = req.params;
    try{
        const service: BooksService = bookContainer.get(BooksService);
        const book = await service.updateBook(id, req.body);
        if(!book){
            res.redirect('/404');
        }
        res.redirect(`/books/${id}`);
    }catch(e){res.status(500).json({ errmsg: 'Ошибка 05:', err: e })}
});

router.post('/delete/:id', async(req, res) => { //удалить книгу по **id** | удаляем книгу и возвращаем ответ: **'ok'**
    const {id} = req.params;
    try{
        const service: BooksService = bookContainer.get(BooksService);
        await service.deleteBook(id);
        res.redirect(`/books`);
    }catch(e){res.status(500).json({ errmsg: 'Ошибка 06:', err: e })}
});

router.get('/download/:id', async(req, res) => { //отдать на скачиваение файл книги по её **:id**
    const {id} = req.params
    try{
        const service: BooksService = bookContainer.get(BooksService);
        const book = await service.getBook(id);
        if (!book) {
            res.redirect('/404')
        }
        const file = `${__dirname}/../../${book.fileCover}`
        res.download(file)
    }catch(e){res.status(500).json({ errmsg: 'Ошибка 07:', err: e })}
});

router.get('/upload/:id', async(req, res) => {
    const {id} = req.params
    try{
        const service: BooksService = bookContainer.get(BooksService);
        const book = await service.getBook(id);
        if (!book) {
            res.redirect('/404')
        }
        res.render("books/upload", {
            title: "Загрузка книги",
            books: book,
        })
    }catch(e){res.status(500).json({ errmsg: 'Ошибка 08:', err: e })}
});

router.post('/upload/:id', fileMulter.single("filedata"), async(req, res) => {
    const {id} = req.params,
        title: string = {...req.body},
        description: string = {...req.body},
        authors: string = {...req.body},
        favorite: string = {...req.body},
        fileName: string = {...req.body},
        fileCover: string = req.file ? req.file.path : {...req.body};
    try{
        const service: BooksService = bookContainer.get(BooksService);
        const book = await service.updateBook(id, {title, description, authors, favorite, fileCover, fileName});
        if(!book){
            res.redirect('/404')
        }
        res.redirect(`/books/${id}`)
    }catch(e){res.status(500).json({ errmsg: 'Ошибка 09:', err: e })}
});

export default router;