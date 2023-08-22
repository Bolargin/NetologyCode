"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
class User {
    constructor(id = (0, uuid_1.v1)(), mail) {
        this.id = id;
        this.mail = mail;
    }
}
router.get("/login", (req, res) => {
    res.status(201);
    const user = new User("1", "test@mail.ru");
    res.json(user);
});
exports.default = router;
