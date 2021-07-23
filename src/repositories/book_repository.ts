import { Book } from "../interfaces/book"
import fs from "fs"
import path from "path"
import { BookAllResponse } from "../interfaces/book_all_response"

class BookRepository {
  books: Array<Book> = []

  dataPath: string = path.resolve(__dirname, "./../data/books.json")

  constructor() {
    this.refresh()
  }

  refresh() {
    const file: string = fs.readFileSync(this.dataPath).toString()

    this.books = JSON.parse(file)
  }

  findAll(): Array<BookAllResponse> {
    return this.books.map(
      (e) =>
        ({
          id: e.id,
          name: e.name,
          publisher: e.publisher,
        } as BookAllResponse)
    )
  }

  findFinished(): Array<BookAllResponse> {
    return this.books
      .slice(0)
      .filter((e) => e.finished == true)
      .map(
        (e) =>
          ({
            id: e.id,
            name: e.name,
            publisher: e.publisher,
          } as BookAllResponse)
      )
  }

  findUnfinished(): Array<BookAllResponse> {
    return this.books
      .slice(0)
      .filter((e) => e.finished != true)
      .map(
        (e) =>
          ({
            id: e.id,
            name: e.name,
            publisher: e.publisher,
          } as BookAllResponse)
      )
  }

  findReading(): Array<BookAllResponse> {
    return this.books
      .slice(0)
      .filter((e) => e.reading == true)
      .map(
        (e) =>
          ({
            id: e.id,
            name: e.name,
            publisher: e.publisher,
          } as BookAllResponse)
      )
  }

  findUnreading(): Array<BookAllResponse> {
    return this.books
      .slice(0)
      .filter((e) => e.reading != true)
      .map(
        (e) =>
          ({
            id: e.id,
            name: e.name,
            publisher: e.publisher,
          } as BookAllResponse)
      )
  }

  findIncludes(name: string): Array<BookAllResponse> {
    return this.books
      .slice(0)
      .filter((e) => e.name.toLocaleLowerCase().includes(name.toLowerCase()))
      .map(
        (e) =>
          ({
            id: e.id,
            name: e.name,
            publisher: e.publisher,
          } as BookAllResponse)
      )
  }

  findById(id: string): Book | undefined {
    const foundBooks: Array<Book> = this.books
      .slice(0)
      .filter((e) => e.id === id)
    if (foundBooks.length != 0) return foundBooks[0]
  }

  create(book: Book): boolean {
    try {
      this.books.push(book)

      const json: string = JSON.stringify(this.books)

      fs.writeFileSync(this.dataPath, json)

      this.refresh()

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  update(id: string, book: Book): boolean {
    try {
      const foundBooks = this.findById(id)

      if (foundBooks != undefined) {
        this.books = this.books.map((e) => {
          if (e.id == id) e = Object.assign<Book, Book>(e, book)

          return e
        })

        const json: string = JSON.stringify(this.books)

        fs.writeFileSync(this.dataPath, json)

        this.refresh()
        return true
      }

      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  delete(id: string): boolean {
    try {
      const foundBooks = this.findById(id)

      if (foundBooks != undefined) {
        this.books = this.books.filter((e) => e.id != id)

        const json: string = JSON.stringify(this.books)

        fs.writeFileSync(this.dataPath, json)

        this.refresh()
        return true
      }

      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

export default new BookRepository()
