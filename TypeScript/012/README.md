# Домашнее задание к занятию «2.7. Тестирование. Библиотека Jest»

**Возьмите решение из домашнего задания «2.3. Подключение базы данных к NestJS (модуль для MongoDB)».**

**Задание 1.**

```
NetologyCode\TypeScript\012\src\books\books.service.spec.ts
``` 

Установите пакет @nestjs/testing.

**Задание 2.**
```
\src\books\books.service.spec.ts
``` 

Напишите unit-тесты на BooksService.

При написании теста используйте утилиты из @nestjs/testing.

При создании тестового модуля используйте секцию providers, чтобы передать модель.

В качестве токена модели используйте [getModelToken](https://docs.nestjs.com/techniques/mongodb#testing).

**Задание 3.**
```
\src\books\e2e.books.service.spec.ts
``` 

Напишите e2e-тесты для BooksController.

При создании тестового модуля используйте секцию providers, чтобы подменить BooksService.

Вам не нужно целиком реализовывать BooksService. Достаточно использовать jest.fn() для создания заглушек.