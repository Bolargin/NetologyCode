"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookContainer = void 0;
var inversify_1 = require("inversify");
var interfaces_1 = require("./interfaces");
var bookContainer = new inversify_1.Container();
exports.bookContainer = bookContainer;
bookContainer.bind(interfaces_1.BooksRepository).toSelf();
