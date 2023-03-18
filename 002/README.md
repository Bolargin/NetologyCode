# Домашнее задание к занятию «1.2 Аргументы командной строки и console»

### Задание 1
Написать утилиту получения текущей даты и времени с богатым интерфейсом.

Текущая дата и время в формате ISO:  
`cmd current`

Текущий год:  
`cmd current --year` или `cmd current -y`

Текущий месяц:  
`cmd current --month` или `cmd current -m`

Дата в календарном месяце:  
`cmd current --date` или `cmd current -d`

Необходимо добавить возможность получать даты в прошлом или будущем через команды `add` и `sub`:  
`cmd add -d 2` - дата и время в формате ISO на два дня вперед
`cmd sub --month 1` - дата и время в формате ISO на 1 месяц назад

### Задание 2
Необходимо написать утилиту командной строки, которая играет в игру "Загадай число".
Программа загадывает число и выводит диапазон значений, в пределах которого число было загадано.
Пользователь набирает числа в стандартный поток ввода и получает ответ больше или меньше, чем загаданное.

Примерный ход работы:
```
cmd
Загадано число в диапазоне от 0 до 100
1
Больше
75
Меньше
55
Отгадано число 55
```
Для решения задачи воспользуйтесь модулем [readline](https://nodejs.org/api/readline.html).

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

async function processValue(value) {
  return new Promise((resolve) => {
    // Perform some async operation on value.
    setTimeout(() => {
      return resolve(value)
    }, 1000)
  })
}

console.info('start')
await yargs(hideBin(process.argv))
  .command('add <x> <y>', 'add two eventual values', () => {}, async (argv) => {
    const sum = await processValue(argv.x) + await processValue(argv.y)
    console.info(`x + y = ${sum}`)
  }).parse()
console.info('finish')