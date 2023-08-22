"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookContainer = void 0;
const inversify_1 = require("inversify");
const books_service_1 = require("./models/books.service");
exports.bookContainer = new inversify_1.Container();
(0, inversify_1.decorate)((0, inversify_1.injectable)(), books_service_1.BooksService);
exports.bookContainer.bind(books_service_1.BooksService).toSelf().inSingletonScope();
