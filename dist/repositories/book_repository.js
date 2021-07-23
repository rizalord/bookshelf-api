"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class BookRepository {
    constructor() {
        this.books = [];
        this.dataPath = path_1.default.resolve(__dirname, "./../data/books.json");
        this.refresh();
    }
    refresh() {
        const file = fs_1.default.readFileSync(this.dataPath).toString();
        this.books = JSON.parse(file);
    }
    findAll() {
        return this.books;
    }
    findById(id) {
        const foundBooks = this.books.filter((e) => e.id === id);
        if (foundBooks.length != 0)
            return foundBooks[0];
    }
    create(book) {
        try {
            this.books.push(book);
            const json = JSON.stringify(this.books);
            fs_1.default.writeFileSync(this.dataPath, json);
            this.refresh();
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    update(id, book) {
        try {
            const foundBooks = this.findById(id);
            if (foundBooks != undefined) {
                this.books = this.books.map((e) => {
                    if (e.id == id)
                        e = Object.assign(e, book);
                    return e;
                });
                const json = JSON.stringify(this.books);
                fs_1.default.writeFileSync(this.dataPath, json);
                this.refresh();
                return true;
            }
            return false;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    delete(id) {
        try {
            const foundBooks = this.findById(id);
            if (foundBooks != undefined) {
                this.books = this.books.filter((e) => e.id != id);
                const json = JSON.stringify(this.books);
                fs_1.default.writeFileSync(this.dataPath, json);
                this.refresh();
                return true;
            }
            return false;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
exports.default = new BookRepository();
