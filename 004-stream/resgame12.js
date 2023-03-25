#!/usr/bin/env node
const fs = require('fs')
const argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('$0 <path>', 'анализ результатов игры', (yargs) => {
        yargs.positional('path', {
          describe: 'имя файла в который будет записаны результаты игры',
          type: 'text'
        })
      })
    .example([['$0 log.txt']])
    .version('1.0.0')
    .demandCommand(1)
    .help()
    .argv
    let data = fs.readFileSync(argv.path, {encoding: 'utf8'}).split('\n')
    let sumgames = data.length -1
    let sum = 0;
    data.map((item) => sum += Number(item))
    console.log(" Количество игр " + sumgames
        + "\n Количество побед " + sum
        + "\n Процент побед " + Math.round(100*sum/sumgames) +"%")