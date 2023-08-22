"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    authors: {
        type: String
    },
    favorite: {
        type: String,
        default: "Нет"
    },
    fileCover: {
        type: String
    },
    fileName: {
        type: String
    }
});
exports.default = (0, mongoose_1.model)('books', bookSchema);
