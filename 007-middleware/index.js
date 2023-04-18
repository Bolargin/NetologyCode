const express = require('express')

const bookRouter = require('./routes/books.js')
const userRouter = require('./routes/user.js')

const err404 = require('./middleware/err404.js')

const app = express()
app.use(express.json())

app.use("/api/books", bookRouter)
app.use("/api/user", userRouter)

app.use(err404)

const PORT = process.env.PORT || 3000
app.listen(PORT)
