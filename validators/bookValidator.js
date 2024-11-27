const Joi = require('joi');

const bookSchema = Joi.object({
    title: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    isbn: Joi.string().length(13).required(),
    published_year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
});

const validateBook = (book) => bookSchema.validate(book);

module.exports = { validateBook };
