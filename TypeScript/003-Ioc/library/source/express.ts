import express, { Express, Request, Response, NextFunction } from 'express';
const router: Express = express();

import { bookContainer } from "./conteiner";
import { BooksRepository } from "./interfaces";

router.get(':id', async (req: Request, res: Response, next: NextFunction) => {
    const repository = bookContainer.get(BooksRepository);
    const book = await repository.getBook(req.params.id);
    res.json(book);
  })