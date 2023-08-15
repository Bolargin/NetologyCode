import express, { Express, Request, Response, NextFunction } from 'express';
const router: Express = express();

import { bookContainer } from "./conteiner";
import { BooksRepository } from "./interfaces";

router.get(':id', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const repository = bookContainer.get(BooksRepository);
    const book = await repository.getBook(req.params.id);
    res.render('books/index', {
      title: 'Все книги',
      books: book
    })
  }catch(e){res.status(500).json({ errmsg: 'Ошибка getBook:', err: e })}
  })