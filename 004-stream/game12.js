#!/usr/bin/env node
const fs = require('fs')
const argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('$0 <filename>', 'игра орел или решка (варианты: 1 или 2) с записью результатов игры', (yargs) => {
        yargs.positional('filename', {
          describe: 'имя файла в который будет записаны результаты игры',
          type: 'text'
        })
      })
    .example([['$0 log.txt']])
    .version('1.0.0')
    .demandCommand(1)
    .help()
    .argv
var readline = require('readline');
var rl = readline.createInterface({ input: process.stdin, output: process.stdout});
console.log('Угадате 1 или 2. Для выхода введите exit.')
let gameRes =0
var asyncReadLine = function () {
    let number = Math.floor(Math.random()*2)+1
    rl.question('', function (answer) {
        if (answer == 'exit'){
            let data = fs.readFileSync(argv.filename, {encoding: 'utf8'}).split('\n')
            let sumgames = data.length -1
            let sum = 0;
            data.map((item) => sum += Number(item))
            console.log(" Количество игр " + sumgames
                         + "\n Количество побед " + sum
                         + "\n Процент побед " + Math.round(100*sum/sumgames) +"%")
            return rl.close()
        }
        else{
            if(answer != number){
                console.log('Не угадал \nЕще раз:')
                gameRes = 0
            }else{
                console.log('Тебе везёт\nЕще раз:')
                gameRes = 1
            }
            fs.appendFile(argv.filename, gameRes + "\n", (err) => {
                if(err) throw err;
                asyncReadLine();
            });
        }
    });
};
asyncReadLine();