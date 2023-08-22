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
exports.BooksService = void 0;
const books_db_1 = __importDefault(require("./books.db"));
class BooksService {
    constructor() {
        console.log("new BooksService");
    }
    createBook(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, authors, favorite, fileCover, fileName } = Object.assign({}, data);
            const book = new books_db_1.default({ title, description, authors, favorite, fileCover, fileName });
            yield book.save();
            return book;
        });
    }
    getBooks() {
        return books_db_1.default.find().select('-__v');
    }
    getBook(id) {
        return books_db_1.default.findById(id).select('-__v');
    }
    updateBook(id, data) {
        const { title, description, authors, favorite, fileCover, fileName } = Object.assign({}, data);
        return books_db_1.default.findById(id, { title, description, authors, favorite, fileCover, fileName }).select('-__v');
    }
    deleteBook(id) {
        return books_db_1.default.deleteOne({ _id: id }).select('-__v');
    }
}
exports.BooksService = BooksService;
