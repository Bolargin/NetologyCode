interface Books{
    readonly id: string,
    title: string,
    description?: string,
    authors?: string,
    favorite: boolean,
    fileCover?: string,
    fileName?: string
}
class Book implements Books{
    id: string;
    title: string;
    description?: string;
    authors?: string;
    favorite: boolean = false;
    fileCover?: string;
    fileName?: string;
    constructor(id: string, title?: string, description?: string, authors?: string, favorite: boolean = false, fileCover?: string, fileName?: string){
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
    }
}
abstract class BooksRepository extends Book{
    createBook(book: Book){//создание книги
        console.log("createBook Not Implemented");
        return 0;
        /*
            const {title, description, authors, favorite, fileCover, fileName} = {...book}
            try{
                await BookDB.create({title, description, authors, favorite, fileCover, fileName})
                res.redirect('/books')
            }catch(e){res.status(500).json({ errmsg: 'Ошибка createBook:', err: e })}
        */
    }
    getBook(id: string){//получение книги по id
        console.log("getBook Not Implemented");
        return 0;
    }
    getBooks(){//получение всех книг
        console.log("getBooks Not Implemented");
        return 0;
    }
    updateBook(id: string){//обновление книги
        console.log("updateBook Not Implemented");
        return 0;
    }
    deleteBook(id: string){//удаление книги
        console.log("deleteBook Not Implemented");
        return 0;
    }
}