import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { getModelToken } from '@nestjs/mongoose';
import { BooksController } from './books.controller';

const mockBook = {
  _id: '650b34787c1eba16fc5b0123',
  title: 'Название 1',
  description: 'Описание 1',
  authors: 'Автор 1',
  favorite: 'Нет',
  fileCover: '100.jpg',
  fileName: '100.txt',
};
const massBook = [
  { _id: '650b34787c1eba16fc5b0123', title: 'Название 1', __v: 0 },
  { _id: '650b41c4a6122d28188f4307', title: 'Название 2', __v: 0 },
  { _id: '650b44e79e82e8de54c06514', title: 'Название 3', __v: 0 },
];

describe('BooksService', () => {
  let service: BooksService;
  let model: Model<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      controllers: [BooksController],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get<Model<Book>>(getModelToken(Book.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAll', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(massBook),
    } as any);
    const result = await service.getAll();
    expect(result).toEqual(massBook);
  });

  it('update', async () => {
    const editBook = { ...mockBook, title: 'Новое название' };
    const editData = { title: 'Новое название' };
    jest.spyOn(model, 'findOneAndUpdate').mockResolvedValue(editBook);
    const result = await service.update(mockBook._id, editData);
    expect(result.title).toEqual(editData.title);
  });

  it('delete', async () => {
    jest.spyOn(model, 'findOneAndRemove').mockResolvedValue(mockBook);
    const result = await service.delete(mockBook._id);
    expect(result).toEqual(mockBook);
  });
});
