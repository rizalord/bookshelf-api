"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const nanoid_1 = require("nanoid");
const http_1 = require("../common/http");
const book_repository_1 = __importDefault(require("../repositories/book_repository"));
class BookController {
    index(request, h) {
        return h.response(new http_1.SuccessResponseObject(null, book_repository_1.default.findAll()));
    }
    find(request, h) {
        const { bookId } = request.params;
        const book = book_repository_1.default.findById(bookId);
        if (book == undefined) {
            return h
                .response(new http_1.FailResponseObject("Buku tidak ditemukan"))
                .code(404);
        }
        return h
            .response(new http_1.SuccessResponseObject(null, {
            book: book,
        }))
            .code(200);
    }
    create(request, h) {
        const { name, year, author, summary, publisher, pageCount, readPage, reading, } = request.payload;
        if (readPage > pageCount)
            return h
                .response(new http_1.FailResponseObject("Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"))
                .code(400);
        try {
            const id = nanoid_1.nanoid(16);
            const finished = pageCount === readPage;
            const insertedAt = moment_1.default.now().toString();
            const updatedAt = moment_1.default.now().toString();
            const book = {
                id,
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage,
                finished,
                reading,
                insertedAt,
                updatedAt,
            };
            if (book_repository_1.default.create(book)) {
                return h
                    .response(new http_1.SuccessResponseObject("Buku berhasil ditambahkan", {
                    bookId: id,
                }))
                    .code(200);
            }
            else {
                return h
                    .response(new http_1.ErrorResponseObject("Buku gagal ditambahkan"))
                    .code(500);
            }
        }
        catch (error) {
            console.log(error);
            return h
                .response(new http_1.ErrorResponseObject("Buku gagal ditambahkan"))
                .code(500);
        }
    }
    update(request, h) {
        const { name, year, author, summary, publisher, pageCount, readPage, reading, } = request.payload;
        const { bookId } = request.params;
        const bookFound = book_repository_1.default.findById(bookId);
        if (bookFound == undefined) {
            return h
                .response(new http_1.FailResponseObject("Gagal memperbarui buku. Id tidak ditemukan"))
                .code(404);
        }
        if (readPage > pageCount)
            return h
                .response(new http_1.FailResponseObject("Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"))
                .code(400);
        try {
            const finished = pageCount === readPage;
            const updatedAt = moment_1.default.now().toString();
            const book = {
                id: bookId,
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage,
                finished,
                reading,
                insertedAt: bookFound.insertedAt,
                updatedAt,
            };
            if (book_repository_1.default.update(bookId, book)) {
                return h
                    .response(new http_1.SuccessResponseObject("Buku berhasil diperbarui"))
                    .code(200);
            }
            else {
                return h
                    .response(new http_1.ErrorResponseObject("Buku gagal diperbarui"))
                    .code(500);
            }
        }
        catch (error) {
            console.log(error);
            return h
                .response(new http_1.ErrorResponseObject("Buku gagal diperbarui"))
                .code(500);
        }
    }
    delete(request, h) {
        const { bookId } = request.params;
        const book = book_repository_1.default.findById(bookId);
        if (book == undefined) {
            return h
                .response(new http_1.FailResponseObject("Buku gagal dihapus. Id tidak ditemukan"))
                .code(404);
        }
        if (book_repository_1.default.delete(bookId)) {
            return h
                .response(new http_1.SuccessResponseObject("Buku berhasil dihapus"))
                .code(200);
        }
        return h
            .response(new http_1.ErrorResponseObject("Buku gagal diperbarui"))
            .code(500);
    }
}
exports.default = new BookController();
