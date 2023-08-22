import {v1 as uuid} from "uuid"; 
import express from "express";
const router = express.Router();

class User {
    id: string;
    mail: string;
    constructor(id = uuid() , mail: string) {
        this.id = id;
		this.mail= mail;
    }
}

router.get("/login", (req, res) => {
    res.status(201)
    const user = new User("1", "test@mail.ru")
    res.json(user)
});

export default router;