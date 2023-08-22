import BookModel from "./books.db";
import {Book} from "./books.interface";

interface CreateBookDto{
  title: Book['title'],
  description: Book['description'],
  authors: Book['authors'],
  favorite: Book['favorite'],
  fileCover: Book['fileCover'],
  fileName: Book['fileName']
}

export class BooksService{
  constructor(){
    console.log("new BooksService");
  }
  async createBook(data: CreateBookDto): Promise<Book>{
    const {title, description, authors, favorite, fileCover, fileName} = {...data};
    const book = new BookModel({title, description, authors, favorite, fileCover, fileName});
    await book.save();
    return book;
  }
  getBooks(): Promise<Book[]>{
    return BookModel.find().select('-__v');
  }
  
  getBook(id: string): Promise<Book>{
    return BookModel.findById(id).select('-__v');
  }

  updateBook(id: string, data: CreateBookDto): Promise<Book>{
    const {title, description, authors, favorite, fileCover, fileName} = {...data};
    return BookModel.findById(id, {title, description, authors, favorite, fileCover, fileName}).select('-__v');
  }
  
  deleteBook(id: string): Promise<Book>{
    return BookModel.deleteOne({_id: id}).select('-__v');
  }
}