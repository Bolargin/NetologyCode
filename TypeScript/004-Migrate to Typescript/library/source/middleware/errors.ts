import * as express from "express";

export const errorMiddleware: express.Handler = function errorMiddleware (req, res) {
    res.render('errors/404', {
        title: 'Ошибка: 404 | Страница не найдена'
    });
}