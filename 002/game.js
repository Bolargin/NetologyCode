#!/usr/bin/env node

const argv = require('yargs/yargs')(process.argv.slice(2))
    .usage("Usage: game")
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
.demandCommand(1)
.help()
.argv