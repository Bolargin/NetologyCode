# Домашнее задание к занятию «2.3. Подключение базы данных к Nest.js: модуль для MongoDB»

**Задание 1.**

Установить пакет @nestjs/mongoose и создать соединение с БД в App модуле приложения.
```sh
npm i -save @nestjs/mongoose mongoose
```

**Задание 2.**

Определить Mongoose-схему и сконфигурировать атрибуты схемы с использованием декораторов, поставляемых пакетом @nestjs/mongoose.
```sh
NetologyCode\TypeScript\008-nestjs-db\src\books\shemas\book.shema.ts
```

**Задание 3.**

Импортировать в собственный модуль Mongoose-модуль с необходимыми для работы схемами в рамках текущего модуля, объявить модель для работы с БД в конструкторе собственного сервиса.
```sh
NetologyCode\TypeScript\008-nestjs-db\src\books\books.module.ts
```

**Задание 4.**

Создать контроллер с 4 методами для операций Get, Post, Put, Delete. По каждому маршруту в сервисе необходимо реализовать соответствующую запросу операцию с использованием модели для работы с БД, созданной на прошлых этапах.
```sh
NetologyCode\TypeScript\008-nestjs-db\src\books\books.controller.ts
NetologyCode\TypeScript\008-nestjs-db\src\books\books.service.ts
```