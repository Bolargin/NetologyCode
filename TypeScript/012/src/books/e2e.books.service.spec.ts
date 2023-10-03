import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { BooksService } from './books.service';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
//import { Connection } from 'mongoose';
import { BooksController } from './books.controller';
import { Book } from './schemas/book.schema';
describe('Books', () => {
  let app: INestApplication;
  const booksService = { getAll: () => ['test'] };
  //let connection: Connection;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: {
            find: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOneAndRemove: jest.fn(),
          },
        },
      ],
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile();
    //connection = await moduleRef.get(getConnectionToken());
    app = moduleRef.createNestApplication();
    await app.init();
  });
  it(`/GET books`, () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(booksService.getAll());
  });
  afterAll(async () => {
    //await connection.close(/*force:*/ true);
    await app.close();
  });
});
