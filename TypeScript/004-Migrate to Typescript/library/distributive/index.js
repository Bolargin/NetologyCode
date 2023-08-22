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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./routes/index"));
const books_1 = __importDefault(require("./routes/books"));
const user_1 = __importDefault(require("./routes/user"));
//import "./container";
const errors_1 = require("./middleware/errors");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use('/', index_1.default);
app.use("/books", books_1.default);
app.use("/user", user_1.default);
app.use(errors_1.errorMiddleware);
const PORT = process.env.PORT || 3000;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect("mongodb://user:pass@mongo:27017/bookdb");
            console.log('MongoDB подключен');
            app.listen(PORT, () => { console.log(`Сервер запущен, порт ${PORT}`); });
        }
        catch (e) {
            console.log(e);
        }
    });
})();
