import { ServerRoute } from "@hapi/hapi"
import Joi from "joi"
import BookController from "../controllers/book_controller"

const routes: Array<ServerRoute> = [
  {
    method: "GET",
    path: "/",
    handler: () => "Hello World",
  },
  {
    method: "GET",
    path: "/books",
    handler: BookController.index,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: BookController.find,
  },
  {
    method: "POST",
    path: "/books",
    handler: BookController.create,
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required().messages({
            "string.base": `"name" should be a type of 'text'`,
            "string.empty": `"name" cannot be an empty field`,
            "any.required": `"name" is a required field`,
          }),
          year: Joi.number().required().messages({
            "number.base": `"year" should be a type of 'number'`,
            "number.empty": `"year" cannot be an empty field`,
            "any.required": `"year" is a required field`,
          }),
          author: Joi.string().required().messages({
            "string.base": `"author" should be a type of 'text'`,
            "string.empty": `"author" cannot be an empty field`,
            "any.required": `"author" is a required field`,
          }),
          summary: Joi.string().required().messages({
            "string.base": `"summary" should be a type of 'text'`,
            "string.empty": `"summary" cannot be an empty field`,
            "any.required": `"summary" is a required field`,
          }),
          publisher: Joi.string().required().messages({
            "string.base": `"publisher" should be a type of 'text'`,
            "string.empty": `"publisher" cannot be an empty field`,
            "any.required": `"publisher" is a required field`,
          }),
          pageCount: Joi.number().required().messages({
            "number.base": `"pageCount" should be a type of 'number'`,
            "number.empty": `"pageCount" cannot be an empty field`,
            "any.required": `"pageCount" is a required field`,
          }),
          readPage: Joi.number().required().messages({
            "number.base": `"readPage" should be a type of 'number'`,
            "number.empty": `"readPage" cannot be an empty field`,
            "any.required": `"readPage" is a required field`,
          }),
          reading: Joi.boolean().required().messages({
            "boolean.base": `"reading" should be a type of 'boolean'`,
            "boolean.empty": `"reading" cannot be an empty field`,
            "any.required": `"reading" is a required field`,
          }),
        }),
        failAction: async (request, h, err) => {
          console.log(err)
          throw err
        },
      },
    },
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: BookController.update,
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required().messages({
            "string.base": `"name" should be a type of 'text'`,
            "string.empty": `"name" cannot be an empty field`,
            "any.required": `"name" is a required field`,
          }),
          year: Joi.number().required().messages({
            "number.base": `"year" should be a type of 'number'`,
            "number.empty": `"year" cannot be an empty field`,
            "any.required": `"year" is a required field`,
          }),
          author: Joi.string().required().messages({
            "string.base": `"author" should be a type of 'text'`,
            "string.empty": `"author" cannot be an empty field`,
            "any.required": `"author" is a required field`,
          }),
          summary: Joi.string().required().messages({
            "string.base": `"summary" should be a type of 'text'`,
            "string.empty": `"summary" cannot be an empty field`,
            "any.required": `"summary" is a required field`,
          }),
          publisher: Joi.string().required().messages({
            "string.base": `"publisher" should be a type of 'text'`,
            "string.empty": `"publisher" cannot be an empty field`,
            "any.required": `"publisher" is a required field`,
          }),
          pageCount: Joi.number().required().messages({
            "number.base": `"pageCount" should be a type of 'number'`,
            "number.empty": `"pageCount" cannot be an empty field`,
            "any.required": `"pageCount" is a required field`,
          }),
          readPage: Joi.number().required().messages({
            "number.base": `"readPage" should be a type of 'number'`,
            "number.empty": `"readPage" cannot be an empty field`,
            "any.required": `"readPage" is a required field`,
          }),
          reading: Joi.boolean().required().messages({
            "boolean.base": `"reading" should be a type of 'boolean'`,
            "boolean.empty": `"reading" cannot be an empty field`,
            "any.required": `"reading" is a required field`,
          }),
        }),
        failAction: async (request, h, err) => {
          console.log(err)
          throw err
        },
      },
    },
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: BookController.delete,
  },
]

export default routes
