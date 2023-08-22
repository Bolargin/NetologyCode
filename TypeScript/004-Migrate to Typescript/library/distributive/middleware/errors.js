"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = function errorMiddleware(req, res) {
    res.render('errors/404', {
        title: 'Ошибка: 404 | Страница не найдена'
    });
};
exports.errorMiddleware = errorMiddleware;
