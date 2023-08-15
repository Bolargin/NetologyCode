# Домашнее задание к занятию «1.3. IoС и DI.  Библиотека reflect-metadata»

#### 1. Установите inversify к разрабатываемому приложению «библиотека» из модуля NDSE «Настройка окружения и Express.js» и создайте IoC-контейнер в файле `container.js`.

NetologyCode\TypeScript\003-IoC\library\source\container.js

#### 2. Добавьте сервис `BooksRepository` из предыдущего задания в IoC-контейнер.

NetologyCode\TypeScript\003-IoC\library\source\container.js  
NetologyCode\TypeScript\003-IoC\library\source\interfaces.js

#### 3. Воспользуйтесь IoC-контейнером в обработчиках запросов `express.js`, чтобы получить `BooksRepository`.

NetologyCode\TypeScript\003-IoC\library\source\express.js