const express = require('express')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index.js')
const bookRouter = require('./routes/books.js')
const userRouter = require('./routes/user.js')

const errorMiddleware = require('./middleware/errors.js')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")

app.use('/', indexRouter)
app.use("/books", bookRouter)
app.use("/user", userRouter)

app.use(errorMiddleware)

const PORT = process.env.PORT || 3000;
(async function (){
    try{
        await mongoose.connect("mongodb://user:pass@mongo:27017/bookdb")
        console.log('MongoDB подключен') 
        app.listen(PORT, ()=>{console.log(`Сервер запущен, порт ${PORT}`)})
    }catch(e){console.log(e)}
})()