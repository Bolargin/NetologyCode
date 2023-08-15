import { Container } from "inversify";
import { BooksRepository } from "./interfaces";

const bookContainer = new Container();
bookContainer.bind(BooksRepository).toSelf()

export { bookContainer };