# Домашнее задание к занятию «2.8. Вебсокеты в NestJS»

**Возьмите решение из домашнего задания «2.8. Протокол WebSocket. Библиотека Socket.IO».**

**Выполните задания.**

**Задание 1.**

Установите пакет @nestjs/websockets.

**Задание 2.**

Создайте модуль для работы с комментариями.

1. Создайте модель BookCommentModel.
2. Создайте сервис BookCommentsService для работы с BookCommentModel.
3. Реализуйте CRUD для работы BookCommentModel и метод findAllBookComment(bookId).

Модель BookCommentModel должна хранить: 

```js
{
    id: "number"
    bookId: "number"
    comment: "string"  
}

```
```
NetologyCode\TypeScript\013\src\bookcomment\schemas\bookcomment.schema.ts
NetologyCode\TypeScript\013\src\bookcomment\bookcomment.service.ts
```

**Задание 3.**

Создайте модуль для работы с комментариями через WebSocket.
1. Создайте класс Gateway.
2. Подключите Gateway к приложению.
3. Подключите BookCommentsService к Gateway.
4. Добавьте обработчик getAllComments, который получает ID книги и возвращает список всех комментариев.
5. Добавьте обработчик addComment, который получает текст комментария и сохраняет его.
```
NetologyCode\TypeScript\013\src\bookcomment\bookcomment.module.ts
NetologyCode\TypeScript\013\src\bookcomment\bookcomment.gateway.ts

```