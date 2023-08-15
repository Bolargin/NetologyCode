db.createUser({
    user: "user",
    pwd: "pass",
    roles: [{
        role: "readWrite",
        db: "bookdb"
    }]
});
db.createCollection("books");
db.books.insertMany(
    [
        {
            title: "Название 1",
            description: "Описание 1",
            authors: "Автор 1",
            favorite: "Нет",
            fileCover: "public/books/001.txt",
            fileName: "001.txt"
        },
        {
            title: "Название 2",
            description: "Описание 2",
            authors: "Автор 2",
            favorite: "Да",
            fileCover: "public/books/002.txt",
            fileName: "002.txt"
        }
    ]
)