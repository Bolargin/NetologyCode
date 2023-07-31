"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Book = /** @class */ (function () {
    function Book(id, title, description, authors, favorite, fileCover, fileName) {
        if (favorite === void 0) { favorite = false; }
        this.favorite = false;
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
    }
    return Book;
}());
var BooksRepository = /** @class */ (function (_super) {
    __extends(BooksRepository, _super);
    function BooksRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BooksRepository.prototype.createBook = function (book) {
        console.log("createBook Not Implemented");
        return 0;
        /*
            const {title, description, authors, favorite, fileCover, fileName} = {...book}
            try{
                await BookDB.create({title, description, authors, favorite, fileCover, fileName})
                res.redirect('/books')
            }catch(e){res.status(500).json({ errmsg: 'Ошибка createBook:', err: e })}
        */
    };
    BooksRepository.prototype.getBook = function (id) {
        console.log("getBook Not Implemented");
        return 0;
    };
    BooksRepository.prototype.getBooks = function () {
        console.log("getBooks Not Implemented");
        return 0;
    };
    BooksRepository.prototype.updateBook = function (id) {
        console.log("updateBook Not Implemented");
        return 0;
    };
    BooksRepository.prototype.deleteBook = function (id) {
        console.log("deleteBook Not Implemented");
        return 0;
    };
    return BooksRepository;
}(Book));
