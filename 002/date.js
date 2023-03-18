#!/usr/bin/env node

const argv = require('yargs/yargs')(process.argv.slice(2))
    .usage("Usage: cmd [current | add | sub] [-y | -m | -d] [value]")
    .version('1.0.0')
    .command(
        '$0',
        'Угадай загаданое число',
        {},
        (argv) => {
            const number = Math.floor(Math.random()*101)
            var readline = require('readline');
            var rl = readline.createInterface({ input: process.stdin, output: process.stdout});
            console.log('Загадано число в диапазоне от 0 до 100 ')
            var asyncReadLine = function () {
                rl.question('', function (answer) {
                    if (answer == 'exit' || answer == number){
                        console.log('Отгадано число ',number)
                        return rl.close()
                    }
                    else{ (answer < number) ? console.log('Больше') : console.log('Меньше')}
                    asyncReadLine();
                    });
            };
            asyncReadLine();
        }
    )
    .command(
        'current',
        'Текущая дата',
        {},
        (argv) => {
            let date = new Date();
            if (argv.y){console.log(date.getFullYear())}
            else if(argv.m){console.log(date.getMonth()+1)}
            else if(argv.d){console.log(date.getDate())}
            else {console.log(date)}
        }
    )
    .command(
        'add [value]',
        'Текущая дата',
        {},
        (argv) => {
            let date = new Date()
            if(argv.value){
                if (argv.y){
                    date.setFullYear(date.getFullYear() + argv.value)
                    console.log(date)
                }
                else if(argv.m){
                    date.setMonth(date.getMonth() + 1 + argv.value)
                    console.log(date)
                }
                else if(argv.d){
                    date.setDate(date.getDate() + argv.value)
                    console.log(date)
                }
                else {console.log('Укажите какое значение увеличить')}
            }
            else {console.log('Укажите на какое значение увеличить')}
        }
    )
    .command(
        'sub [value]',
        'Текущая дата',
        {},
        (argv) => {
            let date = new Date()
            if(argv.value){
                if (argv.y){
                    date.setFullYear(date.getFullYear() - argv.value)
                    console.log(date)
                }
                else if(argv.m){
                    date.setMonth(date.getMonth() + 1 - argv.value)
                    console.log(date)
                }
                else if(argv.d){
                    date.setDate(date.getDate() - argv.value)
                    console.log(date)
                }
                else {console.log('Укажите какое значение увеличить')}
            }
            else {console.log('Укажите на какое значение увеличить')}
        }
    )
    .option('year', {
        alias: 'y',
        type: 'boolean',
        description: 'Год'
    })
    .option('month', {
        alias: 'm',
        type: 'boolean',
        description: 'Месяц'
    })
    .option('date', {
        alias: 'd',
        type: 'boolean',
        description: 'День'
    })
    .help()
    .argv
