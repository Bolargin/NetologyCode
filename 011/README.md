# Домашнее задание к занятию «2.7. Подключение MongoDB в Node.js приложение»

Установлен пакет **Mongoose** и настроено подключение к базе данных.

При подключении к локальной базе данных используется `docker-compose.yml`.

// library/source/index.js

docker-compose up --build -d mongo

//инициалищация базы данных и ее заполнение

docker-compose up

//запуск проекта

Создана **Mongoose-схему** для коллекции **«books»**.

// library/source/models/bookdb.js

Структура документа соответствetn следующей структуре объекта:

```javascript
{
  id: "string",
  title: "string",
  description: "string",
  authors: "string",
  favorite: "string",
  fileCover: "string",
  fileName: "string"
}
``` 

Переписаны все методы, работающие со статичным объектом `Books`, на соответствующие методы для работы с `Mongoose Model Books`.

// library/source/routes/books.js