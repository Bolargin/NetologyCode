import { Container, decorate, injectable} from "inversify";
import { BooksService } from "./models/books.service";

export const bookContainer = new Container();

decorate(injectable(), BooksService);
bookContainer.bind(BooksService).toSelf().inSingletonScope();