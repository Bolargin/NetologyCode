# Домашнее задание к занятию «2.5. Валидация и обработка ошибок. Interceptors, pipes»

**Задание 1.**

Создать Interceptor и подключить его в локальной или глобальной области видимости для перехвата и обработки исключений.
Interceptor должен оборачивать результат при успешном запросе в структуру:
````
{
    status: "success",
    data: ... // данные из контроллера
}
````
При запросе с ошибкой оборачивать в структуру:
````
{
    status: "fail",
    data: ... // сведения об ошибке
}
````
````
NetologyCode/TypeScript/010/src/app.logging.interceptor.ts
NetologyCode/TypeScript/010/src/app.controller.ts
````
**Задание 2.**

Создать Pipe и подключить его в локальной или глобальной области видимости для валидации данных в body, params или query запроса, используя соответствующие декораторы (@Body, @Query, @Params).
````
NetologyCode/TypeScript/010/src/books/validation/validation.pipe.ts
NetologyCode/TypeScript/010/src/books/books.controller.ts
````

**Задание 3.**

Создать метод валидации данных входящего запроса в Pipe с использованием библиотеки Joi или class-validator и DTO.
````
NetologyCode/TypeScript/010/src/books/validation/joi.schema.ts
NetologyCode/TypeScript/010/src/books/validation/joi.validation.pipe.ts
NetologyCode/TypeScript/010/src/books/books.controller.ts
````

**Задание 4.**

Создать Exception Filter и подключить его в локальной или глобальной области видимости для перехвата и формирования унифицированных сообщений об исключениях.
Сообщение должно иметь формат:
````
{
    timestamp: ..., // дата и время
    status: "fail",
    data: ..., // сведения об ошибке
    code: ..., // код ошибки при наличии в объекте ошибки. В случае отсутствия, по умолчанию code = 500
}
````
````
NetologyCode/TypeScript/010/src/books/validation/http.exception.filter.ts
NetologyCode/TypeScript/010/src/books/books.module.ts
````