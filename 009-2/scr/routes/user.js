const { v4: uuid } = require('uuid')
const express = require('express')
const router = express.Router()

class User {
    constructor(id = uuid() , mail = "") {
        this.id = id
		this.mail = mail
    }
}

router.get("/login", (req, res) => { //получить все книги | получаем массив всех книг
    res.status(201)
    const user = new User(1, "test@mail.ru")
    res.json(user)
})
module.exports = router