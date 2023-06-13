# Домашнее задание к занятию «2.6. База данных и хранение данных»

*Каждый документ коллекции **books** содержит следующую структуру данных: 
```javascript
{
    _id: ObjectID(),
    title: "string",
    description: "string",
    authors: "string"
}
``` 
*Запросы для *вставки* данных о книгах в коллекцию **books**
```javascript
db.books.insertMany([
    {
        "title": "1984",
        "description": "самая знаменитая антиутопия ХХ века",
        "authors": "Джордж Оруэлл"
    },
    {
        "title": "Трудно быть богом",
        "description": "знаменитая советская фантастика",
        "authors": "Аркадий и Борис Стругацкие"
    },
])
``` 

*Запросы для *поиска* полей документов коллекции **books** по полю *title*
```javascript
db.books.find(
    {"title": "1984"}
)
```

*Запросы для *редактирования* полей: *description* и *authors* коллекции **books** по *_id* записи

```javascript
db.books.replaceOne({{"_id" : ObjectId(some_id)}, {"description": "спорное произведение", "authors": "неизвестен"})
```