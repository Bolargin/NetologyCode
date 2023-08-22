"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = __importDefault(require("../middleware/file"));
const conteiner_1 = require("../conteiner");
const books_service_1 = require("../models/books.service");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = conteiner_1.bookContainer.get(books_service_1.BooksService);
        const books = yield service.getBooks();
        res.render('books/index', {
            title: 'Все книги',
            books: books
        });
    }
    catch (e) {
        res.status(500).json({ errmsg: 'Ошибка 01:', err: e });
    }
}));
router.get("/create", (req, res) => {
    res.render('books/create', {
        title: 'Создание книги',
        books: []
    });
});
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const service = conteiner_1.bookContainer.get(books_service_1.BooksService);
        const book = yield service.getBook(id);
        if (!book) {
            res.redirect('/404');
        }
        let response = yield fetch(`http://counter:3001/counter/${id}/incr`, { method: 'POST' });
        response = yield fetch(`http://counter:3001/counter/${id}`);
        res.render("books/view", {
            title: "Просмотр книги",
            books: book,
            count: yield response.text()
        });
    }
    catch (e) {
        res.status(500).json({ errmsg: 'Ошибка 02:', err: e });
    }
}));
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = conteiner_1.bookContainer.get(books_service_1.BooksService);
        yield service.createBook(req.body);
        res.redirect('/books');
    }
    catch (e) {
        res.status(500).json({ errmsg: 'Ошибка 03:', err: e });
    }
}));
router.get('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const service = conteiner_1.bookContainer.get(books_service_1.BooksService);
        const book = yield service.getBook(id);
        if (!book) {
            res.redirect('/404');
        }
        res.render("books/update", {
            title: "Редактирование",
            books: book,
        });
    }
    catch (e) {
        res.status(500).json({ errmsg: 'Ошибка 04:', err: e });
    }
}));
router.post('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const service = conteiner_1.bookContainer.get(books_service_1.BooksService);
        const book = yield service.updateBook(id, req.body);
        if (!book) {
            res.redirect('/404');
        }
        res.redirect(`/books/${id}`);
    }
    catch (e) {
        res.status(500).json({ errmsg: 'Ошибка 05:', err: e });
    }
}));
router.post('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const service = conteiner_1.bookContainer.get(books_service_1.BooksService);
        yield service.deleteBook(id);
        res.redirect(`/books`);
    }
    catch (e) {
        res.status(500).json({ errmsg: 'Ошибка 06:', err: e });
    }
}));
router.get('/download/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const service = conteiner_1.bookContainer.get(books_service_1.BooksService);
        const book = yield service.getBook(id);
        if (!book) {
            res.redirect('/404');
        }
        const file = `${__dirname}/../../${book.fileCover}`;
        res.download(file);
    }
    catch (e) {
        res.status(500).json({ errmsg: 'Ошибка 07:', err: e });
    }
}));
router.get('/upload/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const service = conteiner_1.bookContainer.get(books_service_1.BooksService);
        const book = yield service.getBook(id);
        if (!book) {
            res.redirect('/404');
        }
        res.render("books/upload", {
            title: "Загрузка книги",
            books: book,
        });
    }
    catch (e) {
        res.status(500).json({ errmsg: 'Ошибка 08:', err: e });
    }
}));
router.post('/upload/:id', file_1.default.single("filedata"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params, title = Object.assign({}, req.body), description = Object.assign({}, req.body), authors = Object.assign({}, req.body), favorite = Object.assign({}, req.body), fileName = Object.assign({}, req.body), fileCover = req.file ? req.file.path : Object.assign({}, req.body);
    try {
        const service = conteiner_1.bookContainer.get(books_service_1.BooksService);
        const book = yield service.updateBook(id, { title, description, authors, favorite, fileCover, fileName });
        if (!book) {
            res.redirect('/404');
        }
        res.redirect(`/books/${id}`);
    }
    catch (e) {
        res.status(500).json({ errmsg: 'Ошибка 09:', err: e });
    }
}));
exports.default = router;
