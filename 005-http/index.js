#!/usr/bin/env node
require("dotenv").config()
const http = require('http')
const argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('$0 <town>', 'погода в городе', (yargs) => {
        yargs.positional('town', {
                describe: 'название города на английском языке с тире вместо пробелов',
                type: 'text'
            })
    })
    .example([['$0 Moscow']])
    .demandCommand(1)
    .help()
    .argv
const url = `${process.env.APIurl}?access_key=${process.env.APIkey}&query=${argv.town}`
http.get(url, (res) => {
    const {statusCode} = res
    if (statusCode !== 200){
        console.log(`statusCode: ${statusCode}`)
        return
    }
    res.setEncoding('utf8')
    let rowData = ''
    res.on('data', (chunk) => {rowData += chunk})
    res.on('end', () => {
        let parseData = JSON.parse(rowData)
        if(parseData.success === false){
            if(parseData.error.code === 615){
                console.log(`Город ${argv.town} не найден.`)
                return
            }
            console.log(`Ошибка: ${parseData.error.info}`)
                return
        }
        console.log(parseData)
    })
}).on('error', (err) => {
    console.error(err)
})