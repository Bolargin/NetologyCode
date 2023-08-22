import "reflect-metadata";
import express from "express";
import mongoose from "mongoose"
import indexRouter from "./routes/index";
import bookRouter from "./routes/books";
import userRouter from "./routes/user";
//import "./container";
import {errorMiddleware} from "./middleware/errors";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use("/books", bookRouter);
app.use("/user", userRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
(async function (){
    try{
        await mongoose.connect("mongodb://user:pass@mongo:27017/bookdb");
        console.log('MongoDB подключен') ;
        app.listen(PORT, ()=>{console.log(`Сервер запущен, порт ${PORT}`)});
    }catch(e){console.log(e);}
})()