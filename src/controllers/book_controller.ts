import { Request, ResponseToolkit } from "@hapi/hapi"
import moment from "moment"
import { nanoid } from "nanoid"
import {
  ErrorResponseObject,
  FailResponseObject,
  SuccessResponseObject,
} from "../common/http"
import { Book } from "../interfaces/book"
import { BookRequest } from "../interfaces/book_request"
import bookRepository from "../repositories/book_repository"

class BookController {
  index(request: Request, h: ResponseToolkit) {
    const {
      reading,
      finished,
      name,
    }: {
      reading: number
      finished: number
      name: string
    } = request.query as {
      reading: number
      finished: number
      name: string
    }

    if (reading != undefined) {
      const isReading = reading == 1

      if (isReading) {
        return h.response(
          new SuccessResponseObject(null, {
            books: bookRepository.findReading(),
          })
        )
      }

      return h.response(
        new SuccessResponseObject(null, {
          books: bookRepository.findUnreading(),
        })
      )
    }

    if (finished != undefined) {
      const isFinish = finished == 1

      if (isFinish) {
        return h.response(
          new SuccessResponseObject(null, {
            books: bookRepository.findFinished(),
          })
        )
      }

      return h.response(
        new SuccessResponseObject(null, {
          books: bookRepository.findUnfinished(),
        })
      )
    }

    if (name != undefined) {
      return h.response(
        new SuccessResponseObject(null, {
          books: bookRepository.findIncludes(name),
        })
      )
    }

    return h.response(
      new SuccessResponseObject(null, {
        books: bookRepository.findAll(),
      })
    )
  }

  find(request: Request, h: ResponseToolkit) {
    const { bookId }: { bookId: string } = request.params as { bookId: string }

    const book = bookRepository.findById(bookId)

    if (book == undefined) {
      return h
        .response(new FailResponseObject("Buku tidak ditemukan"))
        .code(404)
    }

    return h
      .response(
        new SuccessResponseObject(null, {
          book: book,
        })
      )
      .code(200)
  }

  create(request: Request, h: ResponseToolkit) {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    }: BookRequest = request.payload as BookRequest

    if (readPage > pageCount)
      return h
        .response(
          new FailResponseObject(
            "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
          )
        )
        .code(400)

    try {
      const id: string = nanoid(16)
      const finished: boolean = pageCount === readPage
      const insertedAt: string = moment.now().toString()
      const updatedAt: string = moment.now().toString()

      const book: Book = {
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
      }

      if (name === undefined) {
        return h
          .response(
            new FailResponseObject(
              "Gagal menambahkan buku. Mohon isi nama buku"
            )
          )
          .code(400)
      }

      if (bookRepository.create(book)) {
        return h
          .response(
            new SuccessResponseObject("Buku berhasil ditambahkan", {
              bookId: id,
            })
          )
          .code(201)
      } else {
        return h
          .response(new ErrorResponseObject("Buku gagal ditambahkan"))
          .code(500)
      }
    } catch (error) {
      console.log(error)
      return h
        .response(new ErrorResponseObject("Buku gagal ditambahkan"))
        .code(500)
    }
  }

  update(request: Request, h: ResponseToolkit) {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    }: BookRequest = request.payload as any

    const { bookId }: { bookId: string } = request.params as {
      bookId: string
    }

    const bookFound = bookRepository.findById(bookId)

    if (bookFound == undefined) {
      return h
        .response(
          new FailResponseObject("Gagal memperbarui buku. Id tidak ditemukan")
        )
        .code(404)
    }

    if (name === undefined) {
      return h
        .response(
          new FailResponseObject("Gagal memperbarui buku. Mohon isi nama buku")
        )
        .code(400)
    }

    if (readPage > pageCount)
      return h
        .response(
          new FailResponseObject(
            "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
          )
        )
        .code(400)

    try {
      const finished: boolean = pageCount === readPage
      const updatedAt: string = moment.now().toString()

      const book: Book = {
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
      }

      if (bookRepository.update(bookId, book)) {
        return h
          .response(new SuccessResponseObject("Buku berhasil diperbarui"))
          .code(200)
      } else {
        return h
          .response(new ErrorResponseObject("Buku gagal diperbarui"))
          .code(500)
      }
    } catch (error) {
      console.log(error)
      return h
        .response(new ErrorResponseObject("Buku gagal diperbarui"))
        .code(500)
    }
  }

  delete(request: Request, h: ResponseToolkit) {
    const { bookId }: { bookId: string } = request.params as { bookId: string }

    const book = bookRepository.findById(bookId)

    if (book == undefined) {
      return h
        .response(
          new FailResponseObject("Buku gagal dihapus. Id tidak ditemukan")
        )
        .code(404)
    }

    if (bookRepository.delete(bookId)) {
      return h
        .response(new SuccessResponseObject("Buku berhasil dihapus"))
        .code(200)
    }

    return h
      .response(new ErrorResponseObject("Buku gagal diperbarui"))
      .code(500)
  }
}

export default new BookController()
